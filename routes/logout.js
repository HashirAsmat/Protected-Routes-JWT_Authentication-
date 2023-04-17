const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{   
     //we can't delete cookie but we can replace it with an empty cookie that has 1 millisecond of life.
    res.cookie("jwt",'',{maxAge:1});
    res.redirect("/api/login");
    
})

module.exports = router;