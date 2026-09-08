const {Book}=require('../model/book.mode.js')

const handleBookStoreController=async(req,res)=>{
  try{
    const body=req.body
    if(!body.BookName || !body.BookTitle ||!body.Author ||!body.SellingPrice ){
      return res.status(400).json({Message:"all field required",Success:false})
    }
  

  const bookAdd= await Book.insertOne(body)
if(bookAdd){
   return res.status(201).json({Message:"Data created successfully",id:bookAdd?._id})
}
  }


  catch(err){
          return res.status(500).json({Message:err.message,Success:false})

  }
}

module.exports={handleBookStoreController}