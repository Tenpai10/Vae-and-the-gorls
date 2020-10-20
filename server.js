// Libraries something
const express = require('express')
const expressLayouts = require('express-layouts')

const app = express()
const PORT = process.env.PORT || 3000

require('dotenv/config')

//Connect to Mongo
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology: true, useNewUrlParser: true},
    () => console.log('~')) 

//EJS
app.use(expressLayouts)
app.set('view engine','ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static(__dirname + '/public'));

//Middleware
app.use(express.json())

//Body Parser
app.use(express.urlencoded({extended:false}))

//Routes
const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')
const profileRoute = require('./routes/profile')

//Route INIT
app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/',profileRoute)

app.listen(PORT, console.log(`Server Started on Port  ${PORT}`))