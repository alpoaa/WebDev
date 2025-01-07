const { test, beforeEach, describe, after } = require('node:test')
const assert    = require('node:assert')
const bcrypt    = require('bcrypt')
const supertest = require('supertest')
const mongoose  = require('mongoose')
const app       = require('../app')
const api       = supertest(app)
const User      = require('../models/user')
const helper    = require('./test_helper')

describe('When there is initially one user at database', () => {
  beforeEach(async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user         = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creation succeeds with a new username', async() => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'test',
      name: 'testing testing',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('Creation fails with proper statuscode and message if username already taken', async() => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})