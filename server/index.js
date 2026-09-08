const express=require('express')
const databaseConnection=require('./database.js')
databaseConnection()
const cors=require('cors')
const bookRouter=require('./routes/book.routes.js')

const app=express()
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
   res.send('hi')
})

app.use('/book',bookRouter)


app.listen(9999,()=>{
  console.log("port listening ")
})