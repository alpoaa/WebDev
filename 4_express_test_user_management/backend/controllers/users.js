const usersRouter = require('express').Router()
const bcrypt      = require('bcrypt')
const User        = require('../models/user')

//GET
usersRouter.get('/', async(request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

//POST
usersRouter.post('/', async(request, response) => {
  const { username, name, password } = request.body
  const saltRounds   = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (password.length < 3) {
    return response.status(400).json({ error: 'Path `password` is shorter than the minimum allowed length (3) or does not exists.' })
  }

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter