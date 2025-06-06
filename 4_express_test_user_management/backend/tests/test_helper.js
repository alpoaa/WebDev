const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  }
]

const testNewBlog = {
  title: 'Test',
  author: 'Testing testing',
  url: 'http://test.com',
  likes: 0
}

const testNewBlogNoLikes = {
  title: 'Test',
  author: 'Testing testing',
  url: 'http://test.com',
}

const testNewBlogInvalid = {
  url: 'http://test.com',
  likes: 0
}

const testUserUsernameDuplicateInvalid = {
  username: 'root',
  name: 'name',
  password: 'secret'
}

const testUserUsernameInvalid = {
  username: 'te',
  name: 'name',
  password: 'secret'
}

const testUserPasswordInvalid = {
  username: 'Test 2',
  name: 'Test 2'
}

const blogsInDB = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  testNewBlog,
  testNewBlogNoLikes,
  testNewBlogInvalid,
  testUserUsernameDuplicateInvalid,
  testUserUsernameInvalid,
  testUserPasswordInvalid,
  blogsInDB,
  usersInDB
}