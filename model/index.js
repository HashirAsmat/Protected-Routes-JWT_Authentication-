const mongoose = require('mongoose');
const schema = mongoose.Schema;

//defining schema collection
//MongoDB is DBMS database management system, so we manage the database data by giving it some shape and passing it throught some schema so, thus we are managing the data in the database , by passing the data throught the schema, here in this case we are using mongoDB , which is non relational database.




//schema here is the class and we pass object as the argument , and define the schema there for the instance  which is the schema for the collection, then we map the schema with the collection , 
const UserSchema = new schema({
    _id: {
        type: schema.Types.ObjectId
},
name: { 
    type:String,
    required: true  
},
age: {
    type:Number,
    required:true
},

email: String,

PhoneNumber:{
    type:Number,
    required:true,
},
createdAt:{
    type:schema.Types.Date,
    default:  Date.now,
}
});


// defining the collection as first argument "User", and mapping the schema to the users collection
//we map the schema with the collection , then the schema will be mapped to the collection name "User"
//when the schema gets mapped to the collection name , then the proper model of collection will be created.
//the model can then be used and considered as collection, we can then make it's instance(object) which will be
//documents by nature, the documents will follow a particular schema of the collection, that's why the 
//collection name is suitable for the documents having same schema , because they are collected in the collection.


module.exports= mongoose.model("User", UserSchema);

