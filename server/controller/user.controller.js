const user=require("../model/user.model")
const bcrypt=require("bcrypt")
const handleSignupUserController=async(req,res)=>{
const body=req.body
if(!body?.firstName || !body?.Email || !body?.Password ){
return res.status(400).json({
        success: false, Message:"all field req"})
}
try{

  const saltCount=10
  const hashedPassword=await bcrypt.hash(body.Password,saltCount,)


  const signup= await user.insertOne({...body,Password:hashedPassword})
    if(signup){
    return res.status(200).json({  success: true,Message:"inserted",id:signup?._id})
  }
}catch(err){
  console.log(err)
  return res.status(500).json({     success: false,Message:err.message})
}
}

const handleSigninUserController=async(req,res)=>{
  console.log(err)
  return res.status(500).json({     success: false,Message:err.message})
}


module.exports={handleSignupUserController,handleSigninUserController}