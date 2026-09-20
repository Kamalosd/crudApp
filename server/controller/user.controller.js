const User=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const secret_key="fqsfqshqgsh"
const handleSignupUserController=async(req,res)=>{
const body=req.body
if(!body?.firstName || !body?.Email || !body?.Password ){
return res.status(400).json({
        success: false, Message:"all field req"})
}
try{

  const saltCount=10
  const hashedPassword=await bcrypt.hash(body.Password,saltCount)


  const signup= await User.insertOne({...body,Password:hashedPassword})
    if(signup){
    return res.status(200).json({  success: true,Message:"inserted",id:signup?._id})
  }
}catch(err){
  console.log(err)
  return res.status(500).json({     success: false,Message:err.message})
}
}

const handleSigninUserController=async(req,res)=>{
  const body=req.body
 try{
if(!body?.Email || !body?.Password ){
return res.status(500).json({
        success: false, Message:"email and password are required"})
}

const user=await User.findOne({Email:body.Email})
if(!user){
  return res.status(400).json({
        success: false, Message:"user doesnot exist"})
}

const isPasswordMatched=await bcrypt.compare(body.Password,user.Password)

console.log(isPasswordMatched)
if(!isPasswordMatched){
    return res.status(400).json({
        success: false, Message:"password doesnot match"})
}

const token=jwt.sign({email:user?.Email,id:user?._id},secret_key)
  return res.status(200).json({
        success: true, Message:"user logginsuccessfully",token:token})

 }catch(err){
    console.log(err)
  return res.status(500).json({     success: false,Message:err.message})
 }
}


module.exports={handleSignupUserController,handleSigninUserController}