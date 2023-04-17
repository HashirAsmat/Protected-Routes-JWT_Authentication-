const mongoose = require('mongoose');
const User = require('../models/index');
// we are importing user , user is basically collection and it is class by nature, so we can make it instance i-e object , the object would be document of the collection , the objects or documents  will follow the defined schema for collection. as collection has been modeled to the userSchema in model/index file.


// async function post(req, res,) {
// const {email,password} = req.body;
// console.log(email)
// console.log(password)
// try {
//     // if ( !email || !password) {
//     //     return res.status(400).send("Required fields can't be emptyyyyy");
//     //   } 
//     //there is no needs of those checks because we are making certain field as required in model schema , which throw an error
//     //automatically in try block when it is not pass into body from the signin form ,after that we are catching the error in the catch block...

//       //here the const user is we are declaring the instance of User which is collection , the instance of User is basically document , so const_user is document of the User collection.
//       const user = await User.create({
//             _id:new mongoose.Types.ObjectId(),
//             email,
//             password
//            });
//    res.status(200).send({createdUser: user});
// }
// catch (err) {
    
//     res.status(400).send("error: user not created" + err.message);
// }
// }


/// we are not performing those operation currently this is just for concept purpose
async function get(req, res,) {
try{
const {id} = req.params;
const user = await User.findById(id);
res.status(200).json(user);

}
catch (err) {
console.log(err.message);
res.status(500).send({message: err.message});
}
}

async function getAll(req, res,) {
try{
 const result = await User.find();
 res.status(200).json(result);
 console.log(result);
}
catch (err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
}
}
async function update(req, res, next) {
try{
  const {email} = req.body;
  const {id}= req.params;
  const result = await User.updateOne({_id:id}, {$set: {email:email}});
  res.status(200).json(result);
  console.log(result);
}
catch (err) {
console.log(err.message);
res.status(500).send({message: err.message});
}
}
async function Delete (req, res,) {
try{
    const {id}= req.params;
    const result = await User.deleteOne({_id:id});
    console.log(result);
    res.status(200).json(result);

}
catch (err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
}
}
module.exports ={
    
    get,
    getAll,
    Delete,
    update,

}