const express = require('express')
const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')


//All books
router.get('/', async (req, res)=>{
res.send('all')

})

// New Book
router.get('/new', async (req, res)=>{
    try{
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    }catch(err){
        res.redirect('/')
    }
})

// Creating a new book
router.post('/', async (req,res)=>{
    res.send('created new')
})

module.exports = router