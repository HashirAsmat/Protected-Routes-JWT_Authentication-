const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { isEmail }= require('validator');
const bcrypt = require('bcrypt');
//defining schema collection
//MongoDB is DBMS database management system, so we manage the database data by giving it some shape and passing data throught some schema so, thus we are managing the data in the database , by passing the data throught the schema, here in this case we are using mongoDB , which is non relational database.


//schema here is the class and we pass object as the argument , and define the schema there for the instance  which is the schema for the collection, then we map the schema with the collection , 
const UserSchema = new schema({
    _id: {
        type: schema.Types.ObjectId
},

email: {
    type:String,
    required:[true, "please enter an email"],
    unique:true,
    validate:[isEmail,"please enter a valid email"]
},
     
password:{
    type:String,
    required:[true,'please enter a password'],
    minlength:[6,'the minimum password length is 6 characters']
},
createdAt:{
    type:schema.Types.Date,
    default:  Date.now,
}
});

// defining the collection as first argument "User", and mapping the schema to the [ "users" collection ]
//we map the schema with the collection ,
//when the schema gets mapped to the collection name , then the proper model of collection will be created and returned by the mongoose.model() fucntion.
// e.g: const User = mongoose.model('User',UserSchema);
// module.exports = User;
//the model User can then be used and considered as collection, we can then make it's instance(object) which will be
//documents by nature, the documents will follow a particular schema of the collection, that's why the 
//collection name is suitable for the documents having same schema , because they are collected in the collection.

// we can even define function for the model in schema that will be applied on the model , on which schema is applied- this concept is called mongoDB hooks and those function in schema act like a middlewares fucntions.

//post fires a function after doc is saved to database - here post means "after" , it does not represent post method...
UserSchema.post('save', function(doc,next){
    console.log("new document was created and saved!",doc);
    next();
})



//pre fires a function before doc is saved in database, here the pre means "before"
//here doc is not define as argument to the function because the doc has not been created yet in the collection because it is before saving or creating the new doc.
// "this" keyword is refering to the instinct that we are trying to create or save, it is identicating the instance by the save keyword , the instance that has been saved , this refer to that particular new instance that is about to be saved...
//eg:
//const user = await User.create({
//     _id:new mongoose.Types.ObjectId(),
//     email,
//     password
//    });
//in above example the user is instance of User,so this refers to "user" before it is saved in the database , so it is local version of the user...
UserSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password,salt);
next();
})



//static method to login User
UserSchema.statics.login = async function (email ,password  ) {
const user = await this.findOne({email});
if (user){
const auth = await bcrypt.compare(password,user.password)
if(auth){
    return user
}
else{
    throw Error('incorrect Password')
}

}
throw Error('incorrect Email')
}


module.exports= mongoose.model("User", UserSchema);
//Mongoose will make the collection name as users by default, with smaller u and plural , so users will be the name of collection..


// above line can also be written as : 
// const User =mongoose.model('user',UserSchema);
// module.exports = User;