const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const Book = require('../models/book')
const Author = require('../models/author')
const uploadPath = path.join('public', Book.coverImagemBasePath)
const imageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

const upload = multer({ //fileffilter to do
    dest: uploadPath,

    fileFilter: (req, file, callback)=> {
        callback(null, imageTypes.includes(file.mimetype))
    },
})


//All books
router.get('/', async (req, res)=>{
    try{
        const books = await Book.find({})
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    }catch(err){
        res.redirect('/')
    }
    
})

// New Book
router.get('/new', async (req, res)=>{
    renderNewPage(res, new Book())
})

// Creating a new book
router.post('/', upload.single('cover'), async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        imageName: fileName,
        description: req.body.description
    })

    try{
        const newBook = await book.save()
        res.redirect('books')
    }catch(err){
        if(book.imageName != null){
            deleteCoverIncorrect(book.imageName) // se tiver algum erro ja vai salvar o path no bookscover, por isso excluimos
        }        
        renderNewPage(res, book, true)
    }
})

async function renderNewPage(res, book, hasError = false) {
    try{ 
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }    

        if(hasError){
            params.errorMessage = "Error creating Book"
        }  
        res.render('books/new', params)
    }catch(err){
        res.redirect('books')
    }
}

function deleteCoverIncorrect(filename) {
    fs.unlink(path.join(uploadPath, filename), err =>{
        if(err) console.log(err)
    })
}

module.exports = router