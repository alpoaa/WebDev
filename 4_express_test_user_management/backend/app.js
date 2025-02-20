const config     = require('./utils/config')
const express    = require('express')
require('express-async-errors')
const morgan      = require('morgan')
const app         = express()
const cors        = require('cors')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogsRouter  = require('./controllers/blogs')
const middleware  = require('./utils/middleware')
const logger      = require('./utils/logger')
const mongoose    = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to database')
  })
  .catch((error) => {
    logger.error('error connecting to database:', error.message)
  })

app.use(cors())
app.use(express.json())

morgan.token('body', (request) => {
  return request.body ? JSON.stringify(request.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(middleware.requestExtractorToken)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.requestExtractorUser, blogsRouter) //token extractor middleware needs to be before user extractor

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/tests')
  app.use('/api/testing', testRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app