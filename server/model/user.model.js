const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
    lastName:{
    type:String,
    
  },
  Email:{
    type:String,
    required:true
  },
    Password:{
    type:String,
    required:true
  },
})

const model=mongoose.model("users",userSchema)

module.exports=model