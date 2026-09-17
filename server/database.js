const mongoose=require('mongoose')

const url=async()=>{
  try{

    await mongoose.connect("mongodb://localhost:27017/bookStore")
    console.log("conect")
  }catch(err){
   console.log(err)
  }
}




module.exports=url