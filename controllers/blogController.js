// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
// https://www.youtube.com/watch?v=zW_tZR0Ir3Q&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=11

const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('./blogs/index', { title: 'All Blogs', blogs: result })
        }).catch((err) => {
            console.log(err)
        })
}

const blog_details = (req, res) => {

    //id contains a space as first character, I don't know why
    const id = req.params.id.slice(1)

    Blog.findById(id).then(result => {
        console.log(result)
        res.render('./blogs/details', { blog: result, title: 'Blog Details' })
    }).catch((err) => {
        console.log('Joachim: ERROR:')
        console.log(err)
    })
}

const blog_create_get = (req, res) => {
    res.render('./blogs/create', { title: 'Create a new Blog' })
}

const blog_create_post = (req, res) => {
    const blog = Blog(req.body)
    blog.save().then((result) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    })
}

const blog_delete = (req, res) => {

    const id = req.params.id
    Blog.findByIdAndDelete(id).then(result => {
        //send the url whrere to redirect
        res.json({ redirect: '/' })
    }).catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}