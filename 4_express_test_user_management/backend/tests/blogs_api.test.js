const { test, after, beforeEach, describe } = require('node:test')
const assert          = require('node:assert')
const mongoose        = require('mongoose')
const supertest       = require('supertest')
const app             = require('../app')
const api             = supertest(app)
const Blog            = require('../models/blog')
const testHelper      = require('./test_helper')

describe('Tests when initializing data to test DB', () => {
  beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
  })

  describe('GET', () => {
    test('Can connect to API', async() => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('Return correct amount of blogs', async() => {
      const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.equal(result.body.length, testHelper.initialBlogs.length)
    })

    test('All blogs have id field', async() => {
      const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = result.body

      blogs.forEach(blog => {
        assert.deepStrictEqual(Object.keys(blog).includes('id'), true)
      })

    })
  })

  describe('POST', () => {
    test('Adding blog will increate all blogs with one', async() => {
      await api
        .post('/api/blogs')
        .send(testHelper.testNewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result = await testHelper.blogsInDB()

      assert.strictEqual(result.length, testHelper.initialBlogs.length + 1)
    })

    test('Creating correct content blog', async() => {
      await api
        .post('/api/blogs')
        .send(testHelper.testNewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result        = await testHelper.blogsInDB()
      const newBlogExists = result.find(blog => blog.title === testHelper.testNewBlog.title && blog.author === testHelper.testNewBlog.author) ? true : false
      assert.equal(newBlogExists, true)
    })

    test('Likes will have default value if not existing in the request', async() => {
      await api
        .post('/api/blogs')
        .send(testHelper.testNewBlogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result         = await testHelper.blogsInDB()
      const newBlogNoLikes = result.find(blog => blog.title === testHelper.testNewBlogNoLikes.title && blog.author === testHelper.testNewBlogNoLikes.author)
      assert.strictEqual(newBlogNoLikes.likes, 0)
    })

    test('Blog without required keys should not be inserted into database', async() => {
      await api
        .post('/api/blogs')
        .send(testHelper.testNewBlogInvalid)
        .expect(400)
    })
  })
})

after(async() => {
  await mongoose.connection.close()
})