/*
If there is a request from the browser (clienbt site), then express runs thorugh all get statments 
in the order that they are written in the code (thise file).
When a request matches a get statments and a request has been sent back, no further get event will be triggered.
Hence by writing app.use... after all other get statments, we could make sure that when the url is not matched,
the 404 page is shown.
*/

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { render } = require('ejs')
const blogRoutes = require('./routes/blogRoutes')

// express app
port = 3010
const app = express();
let server

//connect to mongo db
const dbURI = 'mongodb+srv://jrosenberger:123test@cluster0.mimw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((results) => {
        console.log('connnected to db')
        server = app.listen(port)
    }).catch((err) => console.log(err))

app.set('view engine', 'ejs')

console.log('Express listening on port ' + port);
///////////////////////////////////////////////////////////////////////////////
// middleware & static files
///////////////////////////////////////////////////////////////////////////////

// everything in the folder public will be accessible from the webbrowser
app.use(express.static('public'))

// print information about requests
app.use(morgan('dev'))

// takes all url encoded data and makes it available in the req object (accept form data)
app.use(express.urlencoded({ extended: true }))

///////////////////////////////////////////////////////////////////////////////
// routes
///////////////////////////////////////////////////////////////////////////////

// GET
//-----------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// USE
//-----------------------------------------------------------------------------

app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})


