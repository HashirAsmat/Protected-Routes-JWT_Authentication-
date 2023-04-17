const mongoose = require('mongoose');
const User = require('../models/index');
const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60;
const createJwtToken = (id)=>{
    return (
        jwt.sign({id},"my jwt secret", {
            expiresIn:maxAge
        })
    )
    }

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
  
    try {
        //we have created login() static function for User model in model folder
      const user = await User.login(email,password);
      const token = createJwtToken(user._id);
               console.log("jwt"+token)
               res.cookie("jwt",token,{ httpOnly:true,maxAge:maxAge*1000})


      res.status(200).json({user:user._id});
    }
    catch (err) {
        
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
    };
    
    function get(req ,res){
        res.render('login');
    }


    
    module.exports={
        post,
        get
    }
