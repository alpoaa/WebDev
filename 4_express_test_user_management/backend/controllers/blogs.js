//5.1.2025 Removed next & then-catch statements with async-await
//Errors are handled with express-async-errors library
const blogRouter = require('express').Router()
const Blog       = require('../models/blog')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async(request, response) => {
  const blog = Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async(request, response) => {
  const newBlog   = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0
  })
  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter