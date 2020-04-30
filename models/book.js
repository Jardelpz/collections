const mongoose = require('mongoose')
const path = require('path')

const coverImagemBasePath = 'uploads/booksCovers'

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

    imageName:{
        type: String,
        required: true
    },

    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
})

bookSchema.virtual('coverImage').get(function () { //virtual é como se criasse um atributo desse classe, posso agora chamar book.coverImage
    if(this.imageName != null){
        return path.join('/', coverImagemBasePath, this.imageName) //'/' significa public
    }    
})


const author = mongoose.model('Book', bookSchema)

module.exports = author
module.exports.coverImagemBasePath = coverImagemBasePath