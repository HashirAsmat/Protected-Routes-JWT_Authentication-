const express = require('express')
const app = express();
const mongoose = require('mongoose');
const cookiePaser=require('cookie-parser');
app.use(express.static('public'));
app.set('view engine', 'ejs');
const Router = require('./routes');
//middleWare functions
app.use(cookiePaser());
app.use(express.json());
app.use(express.urlencoded())

connection();

//All routes
app.use('/api',Router)

app.listen(3000,()=>{
    console.log('listening on port',3000);
})
// server file
/////////////////////////////////////////////////////
async function connection (){
    try{
    mongoose.connect("mongodb+srv://Hashir_test_1:test1@cluster1.99mrp.mongodb.net/mernstack")
    console.log("connected to database!")
    }
    catch(err){console.log("could not connect to database!" + err.message)
    }

}