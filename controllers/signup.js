const mongoose = require('mongoose');
const User = require('../models/index');
const jwt = require('jsonwebtoken');


const maxAge = 3*24*60*60
const createJwtToken = (id)=>{
return (
    jwt.sign({id},"my jwt secret", {
        expiresIn:maxAge
    })
)
}
  //  const handleErrors = (err) => {
  //   console.log(err.message, err.code );
  //   let errors = { email: '', password: '' };
  
  //   // duplicate email error
  //   if (err.code === 11000) {
  //     errors.email = 'that email is already registered';
  //     return errors;
  //   }
  
  //   // validation errors
  //   if (err.message.includes('User validation failed')); {
  //     // console.log(err);
  //     Object.values(err.errors).forEach(({ properties }) => {
  //       // console.log(val);
  //       // console.log(properties);
  //       errors[properties.path] = properties.message;
  //     });
  //   }
  
  //   return errors;
  // }
  const handleErrors = (err) => {
    console.log("err.message, err.code ",err.message, err.code );
    let errors = { email: '', password: '' };
  
    //incorrect email
    if(err.message === "incorrect Email"){
        errors.email="That email is not registered";
    }
    //incorrect password
    if(err.message === "incorrect Password"){
        errors.password="That password is not correct";
    }
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('User validation failed')){
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }
  
async function post(req, res,) {
    const {email,password} = req.body;
    console.log(email)
    console.log(password)
    try {
        //   } 
        //there is no needs of those checks because we are making certain field as required in model schema , which throw an error
        //automatically in try block when it is not pass into body from the signin form ,after that we are catching the error in the catch block...
          //here the const user is we are declaring the instance of User which is collection , the instance of User is basically document , so const_user is document of the User collection.
          const user = await User.create({
                _id:new mongoose.Types.ObjectId(),
                email,
                password
               });
               const token = createJwtToken(user._id);
               console.log("jwt"+token)
               res.cookie("jwt",token,{ httpOnly:true,maxAge:maxAge*1000})
               res.status(200).send({createdUser: user});
       
    }
    catch (err) {
        
        const errors = handleErrors(err);
        res.status(400).json( {errors} );
    }
    };
    
    function get(req ,res){
        res.render('signup');
    }

    module.exports={
        post,
        get
    }



    //to understand error handling: Node Auth Tutorial (JWT) #12 - New User Signup (part 2) - by the net-ninja (youtube)