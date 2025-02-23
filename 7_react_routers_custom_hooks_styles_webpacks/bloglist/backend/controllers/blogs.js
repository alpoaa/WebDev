const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

blogRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
    if (!request.token) {
      return response.status(401).json({ error: 'token invalid' })
    }
  
    const body = request.body
    const user = await User.findById(request.userId)
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })
    const savedBlog = await newBlog.save()
  
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.status(201).json(savedBlog)
})
  
blogRouter.put('/:id', async(request, response) => {
    const requestBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, requestBlog, { new: true })
    response.json(updatedBlog)
})
  
blogRouter.delete('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
  
    if (blog.user.toString() === request.userId) {
      const user = await User.findById(request.userId)
      user.blogs = user.blogs.filter(userBlog => userBlog.toString() !== blog.id.toString())
      await user.save()
  
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
  
    response.status(401).json({ error: 'Deleting the blog is only allowed by the user who has created it' })
})
  
module.exports = blogRouter