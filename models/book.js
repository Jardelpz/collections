const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },

    publishDate:{
        type: Date,
        required: true
    },

    pageCount:{
        type: Number,
        required: true
    },

    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }, 

    imagemName:{
        type: String,
        required: true
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
})


const author = mongoose.model('Book', bookSchema)

module.exports = author