const express=require('express')
const router=express.Router()
const {handleAddBookController,handleAddBookListController,handleDeleteBookController,handleUpdateBookController}=require('../controller/book.controller.js')

router.post('/addBook',handleAddBookController)

router.get('/bookList',handleAddBookListController)

router.post('/deleteBook',handleDeleteBookController)

router.put('/updateBook',handleUpdateBookController)

module.exports=router