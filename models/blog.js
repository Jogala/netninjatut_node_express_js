const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

//use Schema to create a Blog model
//model('Blog') will look for Blogs in the database
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
