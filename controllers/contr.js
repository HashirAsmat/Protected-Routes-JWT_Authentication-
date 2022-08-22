const mongoose = require('mongoose');
const User = require('../model/index');


// we are importing user , user is basically collection and it is class by nature, so we can make it instance i-e object , the object would be document of the collection , the objects or documents  will follow the defined schema for collection. as collection has been modeled to the userSchema in model/index file.
async function post(req, res,) {

const {name, age,email,PhoneNumber} = req.body;

try {
    if (!name || !age || !PhoneNumber) {
        return res.status(400).send("Required fields can't be empty");
      }

      //here the const user is we are declaring the instance of User which is collection , the instance of User is basically document , so const_user is document of the User collection.

 const user =   new User({
    _id: new mongoose.Types.ObjectId(),
   name: name,
   age: age,
   email: email,
   PhoneNumber: PhoneNumber,
    })
    

    // here we are saving the document into the database collection by calling the save method on it which is time taking by nature ...

    
    await user.save();
   res.status(200).send({createdUser: user});

}
 
catch (err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
}
}


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
  const {name} = req.body;
  const {id}= req.params;
  const result = await User.updateOne({_id:id}, {$set: {name:name}});
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
    post,
    get,
    getAll,
    Delete,
    update,

}