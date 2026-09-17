const {Book}=require('../model/book.mode')

const handleAddBookController=async(req,res)=>{
try{
 
  const body=req.body
  if(!body.bookName|| ! body.bookTitle || ! body.Author || ! body.sellingPrice ){

    return res.status(400).json({
        success: false, Message:"all field req"})

  }

  const bookAdd= await Book.insertOne(body)
 
  if(bookAdd){
    return res.status(200).json({  success: true,Message:"inserted",id:bookAdd?._id})
  }
}catch(err){
  console.log(err)
  return res.status(500).json({     success: false,Message:err.message})

}

}


const handleAddBookListController=async(req,res)=>{
  try{
   const bookList=await Book.find({})
   return res.status(200).json({Message:"fetched successfully",totalCount:bookList.length,bookList:bookList})
  }
catch(err){
    return res.status(500).json({Message:err.message})
}
}



const handleDeleteBookController=async(req,res)=>{

  const body=req.body
  try{
const deleted= await Book.deleteOne({_id:body.Id })

 return res.json({  success: true,Message:"Book Deleted successfully"})
  }
  catch(err){
  return res.status(500).json({Message:err.message})
  }
}

const handleUpdateBookController=async(req,res)=>{

  try{
    
    const body=req.body
    const updating=await Book.updateOne({_id:body.Id},{   $set: {
          bookName: body.bookName,
          bookTitle: body.bookTitle,
          Author: body.Author,
          sellingPrice: body.sellingPrice,
          publishDate: body.publishDate
        }})

      return res.json({success: true,Message:"Book updated successfully"})

  }catch(err){
      return res.status(500).json({  success: false,Message:err.message})
  }

}

module.exports={handleAddBookController,handleAddBookListController,handleDeleteBookController,handleUpdateBookController}