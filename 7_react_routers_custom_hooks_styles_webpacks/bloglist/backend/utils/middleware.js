const logger = require('./logger')
const jwt    = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'Error' && error.message.includes('data and salt arguments required')) {
    return response.status(400).json({ error: 'User validation failed: username: Path `password` is required.' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const requestExtractorToken = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const requestExtractorUser = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(decodedToken.username && decodedToken.id) {
    request.user   = decodedToken.username
    request.userId = decodedToken.id
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestExtractorToken,
  requestExtractorUser
}