const mongoose = require('mongoose');
const { Schema } = mongoose;
let dt=new Date().getFullYear();
const BooksSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true, 
    },
    yearPublished:{
        type: String,
        default:dt
    },
    Quantity:{
        type: Number,
        default: 1,
        min :1
    },
  });
  module.exports = mongoose.model('books', BooksSchema);