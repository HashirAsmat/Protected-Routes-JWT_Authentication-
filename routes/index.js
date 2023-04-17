const express = require('express');
router = express.Router();
const signupRoute = require('./signup');
const userRoute = require('./users');
const loginRoute = require('./login');
const logoutRoute = require('./logout');

const {requireAuth} = require('../middlewares/authMiddleware');
router.get('/',(req,res)=>{res.send("index working!")});
router.use('/logout',logoutRoute);
router.use('/signup',signupRoute);
router.use('/login',loginRoute);
router.use('/users',userRoute);


router.get('/home',requireAuth,(req, res) => {
    res.render('home');
})
router.get('/smoothies',requireAuth,(req,res)=>{
     res.render('smoothies')});



module.exports = router;