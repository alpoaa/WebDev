const { test, after, describe, beforeEach } = require('node:test')
const assert          = require('node:assert')
const mongoose        = require('mongoose')
const bcrypt          = require('bcrypt')
const supertest       = require('supertest')
const app             = require('../app')
const api             = supertest(app)
const User            = require('../models/user')
const testHelper      = require('./test_helper')

describe('When there is initially one user in the database', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(process.env.TEST_USER_PASSWORD, 10)
    const user         = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creation of new user will be inserted into database', async() => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'test',
      name: 'testing testing',
      password: process.env.TEST_USER_PASSWORD
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('Invalid user creation - username exists', async() => {
    const usersAtStart = testHelper.usersInDB()

    const result = await api
      .post('/api/users')
      .send(testHelper.testUserUsernameDuplicateInvalid)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = testHelper.usersInDB()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('Invalid user creation - invalid username', async() => {
    const usersAtStart = testHelper.usersInDB()

    const result = await api
      .post('/api/users')
      .send(testHelper.testUserUsernameInvalid)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = testHelper.usersInDB()

    assert(result.body.error.includes('username: Path `username` (`te`) is shorter than the minimum allowed length (3)'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('Invalid user creation - invalid password', async() => {
    const usersAtStart = testHelper.usersInDB()

    const result = await api
      .post('/api/users')
      .send(testHelper.testUserPasswordInvalid)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = testHelper.usersInDB()

    assert(result.body.error.includes('Path `password` is required.'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async() => {
  await User.deleteMany({})
  await mongoose.connection.close()
})