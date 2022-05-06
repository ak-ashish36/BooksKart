const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema({
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true, 
    },
    yearPublished:{
        type: String
    }
  });
  module.exports = mongoose.model('userbook', BooksSchema);