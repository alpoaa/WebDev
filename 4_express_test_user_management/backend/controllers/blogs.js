const blogRouter = require('express').Router()
const Blog       = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({})
    .then(blogs => {
        response.json(blogs)
    })
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
  const newBlog = new Blog(request.body)

  newBlog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter