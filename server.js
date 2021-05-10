// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').load()
// }
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index') // importing index.js from routes folder

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


app.use(expressLayouts)
app.use(express.static('public'))


// mongoose connection 
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => { console.log('Connected to database!!') })


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)