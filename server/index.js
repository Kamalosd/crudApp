const express = require('express')
const url = require('./database')
const userRouter=require('./routes/user.route.js')
url()
const cors = require('cors')

const bookRouter = require('./routes/book.routes.js')

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    console.log("hi")
    res.send("Server is running")
})

app.use('/book', bookRouter)
app.use('/user',userRouter)

app.listen(9999, () => {
    console.log("port listen")
})