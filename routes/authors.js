const express = require('express')
const router= express()

const Auhtor= require('../models/author')

// All Authors
router.get('/', async (req, res)=>{ //==authors/
    let searchOptions = {}
    if(req.query.name != null || req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i') //i de case insensitive, responsavel por procurar por palavras parecidas rd de jardel, por exemplo
    }
    try{
        const authors= await Auhtor.find(searchOptions)
        res.render('authors/index', { authors: authors, searchOptions : req.query })
    }catch(err){
        res.redirect('/')
    }
    
})

// New Auhtor
router.get('/new', (req, res)=>{
    res.render('authors/new') // pagina de formulario
})

// Create new Auhtor
router.post('/', async (req, res)=>{
    //body parser, usado para facilitar a coleta de requisições
    const author = new Auhtor({
        name: req.body.name,
    })
    
    try{
        const newAuthor = await author.save()
        res.redirect('authors') // aq precisa por todo o caminho
    }catch(err){
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating user'
        })
    }
})

module.exports = router