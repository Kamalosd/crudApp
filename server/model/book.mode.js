const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true
  },
  bookTitle: {
    type: String,
    required: true
  },
  Author: {
    type: String,
    required: true
  },
  sellingPrice: {
    type: String,
    required: true
  },
  publishDate: {
    type: String,
  },
},
{ timestamps: true }
)

const Book = mongoose.model("Books", bookSchema)

module.exports = { Book }