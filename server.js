if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: __dirname + '/.env'})
}
const express=require('express')
const expressLayouts= require('express-ejs-layouts')
const mongoose = require('mongoose')

const indexRouter= require('./routes/index')

const app= express()
app.set('view engine', 'ejs') 
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout') //vai ter um layout padrao, cada layout vei se colocado aqui dentro, tipo o esqueleto do site

app.use(expressLayouts)
app.use(express.static('public')) //css, js e imagens
app.use('/', indexRouter)

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.listen(process.env.PORT || 3000)