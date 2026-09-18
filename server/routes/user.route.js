const express=require('express')
const router=express.Router()
const {handleSigninUserController,handleSignupUserController}=require("../controller/user.controller")

router.post('/create',handleSignupUserController)
router.post('/login',handleSigninUserController)

module.exports=router