const jwt = require("jsonwebtoken");

const requireAuth = (req,res,next) => {
const token = req.cookies.jwt;

//check whether jwt token exists and is varified

if(token){
jwt.verify(token,"my jwt secret",(err,decodedToken)=>{
    if(err){
        console.log(err.message);
        res.redirect("/api/login")
    }
    if(decodedToken){
        console.log(decodedToken);
        next();
    }
})
}
else{
    res.redirect("/api/login")
}
}

module.exports= {requireAuth};