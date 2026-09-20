const jwt=require('jsonwebtoken')
const secret_key="fqsfqshqgsh"
const User=require("../model/user.model")

const middleware=async(req,res,next)=>{
const authHeader=req.header.authorization

try{
if(!authHeader||! authHeader.startsWith("Bearer ")){
  return res.status(401).json({  Message:"invalid token"})
}
const token=authHeader.split('')[1]
const verified=jwt.verify(token,secret_key)
if(!verified){
    return res.status(500).json({  Message:"invalid token"})
}

const verifiedUser=await User.findOne({Email:verified.email}).select(".Password")

if(!verifiedUser){
    return res.status(500).json({  Message:"not a valid user"})
}

req.User=verifiedUser
next()

}catch(err){

  if(err.name="tokenExpiredError"){
    return res.status(401).json({  Message:"token expired"})
  }

    if(err.name="jsonWebTokenError"){
    return res.status(403).json({  Message:"invalid token authentication failed"})
  }

  return res.status(500).json({     success: false,Message:err.message})
}
}

module.exports=middleware