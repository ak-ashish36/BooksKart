const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchadmin');
const Books = require('../models/books');

// ROUTE 1: Fetch All the Books
router.get('/fetchbooks', fetchAdmin, async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books)
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 2: Add a new Book
router.post('/addbook', fetchAdmin, async (req, res) => {
    let success=false;
    try {
        const { name, author, year } = req.body;
        let book = await Books.findOne({ name, author });
        if (book) {
            return res.status(400).json({ error: "Book already Published",success });
        }
        if (year) {
            book = new Books({
                name, author, yearPublished: year
            })
        }
        else {
            book = new Books({
                name, author
            })
        }
        const savedBook = await book.save();
        success=true;
        res.json({success,savedBook})
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 3: Increase an existing Book Quantity
router.put('/increasebook/:id', fetchAdmin, async (req, res) => {
    try {
        let book = await Books.findById(req.params.id);
        if (!book) { return res.status(404).send(" Book Not Found") }

        let quantity = book.Quantity;

        book = await Books.findByIdAndUpdate(req.params.id, { Quantity: quantity + 1 }, { new: true })
        res.json({ book });
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 3: Decrease an existing Book Quantity
router.put('/decreasebook/:id', async (req, res) => {
    try {
        let book = await Books.findById(req.params.id);
        if (!book) { return res.status(404).send(" Book Not Found") }

        let quantity = book.Quantity;
        if (quantity === 0) {
            return;
        }
        book = await Books.findByIdAndUpdate(req.params.id, { Quantity: quantity - 1 }, { new: true })
        res.json({ book });
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})

// ROUTE 4: Delete an existing Book
router.delete('/deletebook/:id', fetchAdmin, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let book = await Books.findById(req.params.id);
        if (!book) { return res.status(404).send("Not Found") }

        book = await Books.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" });
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
})
module.exports = router