const express=require('express')
const {handleBookStoreController, handleBookListController,handleBookDeleteController,handleBookEditController}=require('../controller/book.controller')

const router=express.Router()

router.post("/addBook",handleBookStoreController)
router.get("/bookLists",handleBookListController)
router.post("/deleteBook",handleBookDeleteController)
router.put("/updateBook", handleBookEditController)

module.exports=router