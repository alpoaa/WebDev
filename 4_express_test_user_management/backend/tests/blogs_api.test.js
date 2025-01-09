const { test, after, beforeEach, describe } = require('node:test')
const assert          = require('node:assert')
const mongoose        = require('mongoose')
const supertest       = require('supertest')
const bcrypt          = require('bcrypt')
const app             = require('../app')
const api             = supertest(app)
const Blog            = require('../models/blog')
const User            = require('../models/user')
const testHelper      = require('./test_helper')

describe.only('Tests when initializing data to test DB', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(process.env.TEST_USER_PASSWORD, 10)
    const testUser     = new User({ username: 'root', passwordHash })

    await testUser.save()

    const loginResult = await api
      .post('/api/login')
      .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await Blog.deleteMany({})

    for (let blog of testHelper.initialBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    }
  })

  describe('GET', () => {
    test('Can connect to API', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('Return correct amount of blogs', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const result = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.equal(result.body.length, testHelper.initialBlogs.length)
    })

    test('All blogs have id field', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const result = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = result.body

      blogs.forEach(blog => {
        assert.deepStrictEqual(Object.keys(blog).includes('id'), true)
      })

    })
  })

  describe('POST', () => {
    test('Can not create blog without token', async() => {
      const result = await api
        .post('/api/blogs')
        .send(testHelper.testNewBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      assert(result.body.error.includes('token missing or invalid'))
    })

    test('Adding blog will increate all blogs with one', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .send(testHelper.testNewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result = await testHelper.blogsInDB()

      assert.strictEqual(result.length, testHelper.initialBlogs.length + 1)
    })

    test('Creating correct content blog', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .send(testHelper.testNewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result        = await testHelper.blogsInDB()
      const newBlogExists = result.find(blog => blog.title === testHelper.testNewBlog.title && blog.author === testHelper.testNewBlog.author) ? true : false
      assert.equal(newBlogExists, true)
    })

    test('Likes will have default value if not existing in the request', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .send(testHelper.testNewBlogNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const result         = await testHelper.blogsInDB()
      const newBlogNoLikes = result.find(blog => blog.title === testHelper.testNewBlogNoLikes.title && blog.author === testHelper.testNewBlogNoLikes.author)
      assert.strictEqual(newBlogNoLikes.likes, 0)
    })

    test('Blog without required keys should not be inserted into database', async() => {
      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .send(testHelper.testNewBlogInvalid)
        .expect(400)
    })
  })

  describe('PUT', () => {
    test('Update the likes will be updated into the database', async() => {
      const testBlogs = await testHelper.blogsInDB()

      let updateBlog   = testBlogs[0]
      updateBlog.likes = updateBlog.likes + 1

      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .put(`/api/blogs/${updateBlog.id}`)
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .send(updateBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const testBlogsUpdated = await testHelper.blogsInDB()
      const testBlogUpdated  = testBlogsUpdated.find(blog => blog.id === updateBlog.id)

      assert.strictEqual(testBlogUpdated.likes, updateBlog.likes)
    })
  })

  describe('DELETE', () => {
    test('Removing the blog will be removed from the database and user can delete the blog', async() => {
      const testBlogs  = await testHelper.blogsInDB()
      const blogDelete = testBlogs[0]

      const loginResult = await api
        .post('/api/login')
        .send({ username: 'root', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .delete(`/api/blogs/${blogDelete.id}`)
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .expect(204)

      const testBlogsDeleted = await testHelper.blogsInDB()
      assert.strictEqual(testBlogsDeleted.length, testHelper.initialBlogs.length - 1)

      const testBlogsIds = testBlogsDeleted.map(blog => blog.id)
      assert(!testBlogsIds.includes(blogDelete.id))
    })

    test('User who has not created blog, can not remove it', async() => {
      const testBlogs  = await testHelper.blogsInDB()
      const blogDelete = testBlogs[0]

      const passwordHash    = await bcrypt.hash(process.env.TEST_USER_PASSWORD, 10)
      const invalidUser     = new User({ username: 'wrongUser', passwordHash })
      await invalidUser.save()

      const loginResult = await api
        .post('/api/login')
        .send({ username: 'wrongUser', password: process.env.TEST_USER_PASSWORD })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const result = await api
        .delete(`/api/blogs/${blogDelete.id}`)
        .set('Authorization', `Bearer ${loginResult.body.token}`)
        .expect(401)

      const testBlogsDeleted = await testHelper.blogsInDB()
      assert.strictEqual(testBlogsDeleted.length, testHelper.initialBlogs.length)
      assert(result.body.error.includes('Deleting the blog is only allowed by the user who has created it'))
    })
  })
})

after(async() => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await mongoose.connection.close()
})