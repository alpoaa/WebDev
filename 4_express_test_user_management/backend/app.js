const config     = require('./utils/config')
const express    = require('express')
const morgan     = require('morgan')
const app        = express()
const cors       = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger     = require('./utils/logger')
const mongoose   = require('mongoose')

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
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app