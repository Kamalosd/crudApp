const {Book}=require('../model/book.mode.js')

const handleBookStoreController=async(req,res)=>{
  try{
    const body=req.body
    if(!body.BookName || !body.BookTitle ||!body.Author ||!body.SellingPrice ){
      return res.status(400).json({Message:"all field required",success:false})
    }
  

  const bookAdd= await Book.insertOne(body)
if(bookAdd){
return res.status(201).json({Message:"Data created successfully", success:true, id:bookAdd?._id})
}
  }


  catch(err){
          return res.status(500).json({Message:err.message,success:false})

  }
}







const handleBookListController=async(req,res)=>{

  try{
      const bookList= await Book.find({})
            return res.status(200).json({Message:"All booked fetched successfully",success:true,totalCount:bookList.length,bookList:bookList})
  }
  catch(err){
      return res.status(400).json({Message:err.message,success:false})
  }

}




const handleBookDeleteController=async(req,res)=>{
  const body=req.body
  try{
   const deleted=await Book.deleteOne({_id:body.Id})
   if(deleted.acknowledged){
     return res.json({Message:"Book Deleted successfully",success:true})
   }
  }catch(err){
      return res.status(400).json({Message:err.message,success:false})
  }
  }






  const handleBookEditController=async(req,res)=>{
try{
  const body=req.body
const updating=await Book.updateOne({_id:body?.Id},{$set:body})

   if(updating?.acknowledged){
     return res.json({Message:"Book updated successfully",success:true})
}}catch(err){
    return res.status(400).json({Message:err.message,success:false})
}

  }

module.exports={handleBookStoreController, handleBookListController,handleBookDeleteController, handleBookEditController}