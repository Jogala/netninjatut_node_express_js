const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router()

// GET
//-----------------------------------------------------------------------------

router.get('/', blogController.blog_index)

//important that get '/blogs/create' comes before get '/blogs/:id', otherwise create would be taken as a :id
router.get('/create', blogController.blog_create_get)


router.get('/:id', blogController.blog_details)

// POST
//-----------------------------------------------------------------------------

router.post('/', blogController.blog_create_post)

// Delete
//-----------------------------------------------------------------------------
router.delete('/:id', blogController.blog_delete)

module.exports = router;