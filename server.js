const express = require('express')
const app = express();
const userRoute = require('./routes/users');
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Hashir_test_1:test1@cluster1.99mrp.mongodb.net/Mongoose"
)

app.get('/',(req, res) => {
    res.send("base URL working! ");
    
})
app.use('/users',userRoute);

app.listen(3000,()=>{
    console.log('listening on port',3000);
})