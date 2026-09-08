const mongoose=require('mongoose')
const databaseConnection=async()=>{
 await mongoose.connect('mongodb://localhost:27017/bookStore')
  .then(()=>{
    console.log("success")
  })
.catch((err)=>{
   console.log("failed")
})
}

module.exports=databaseConnection