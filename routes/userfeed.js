const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Books = require('../models/books');
const userBooks = require('../models/userbooks');
var mongoose = require('mongoose');


// ROUTE 1: Fetch All the Books
router.get('/fetchbook',async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books)
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 2: Fetch Searched book
router.get('/fetchbook/:name', async (req, res) => {
    try {
        const books = await Books.find({$or:[{name:req.params.name},{author:req.params.name },{yearPublished:req.params.name}]});
        res.json(books)
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 3: Purchase
router.post('/buybook/:bookId/:name/:author/:yearPublished', fetchuser, async (req, res) => {
    let success=false;
    try {
        const {bookId, name, author, yearPublished } = req.params;
        let book = await userBooks.findOne({bookId,userId:req.userId});
        if (book) {
            return res.status(400).json({ error: "Book already Purchased" ,success});
        }
        book = new userBooks({
            bookId,name,author,yearPublished,userId:req.userId
        })
        const savedBook = await book.save();
        success=true;
        res.json({savedBook,success})
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 4: Fetch User the Books
router.get('/fetchuserbook', fetchuser, async (req, res) => {
    try {
        const books = await userBooks.find({userId:req.userId});
        res.json(books)
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})



module.exports = router