const express = require('express')
const app = express()

const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const middlewares = require('./utils/middlewares')
const columnsRouter = require('./routes/columns')
const tasksRouter = require('./routes/tasks')
const logger = require('./utils/logger')
const config = require('./utils/config')

if (!mongoose.connection.readyState) {
  mongoose.set('strictQuery', false)
  logger.info('Connecting to mongo db:', config.MONGO_URL)
  mongoose.connect(config.MONGO_URL)
    .then(() => {
      logger.info('Connected to dabase.')
    })
    .catch((error) => {
      logger.error(`Error connecting to database: ${error.message}`)
    })
}

app.use(cors())
app.use(express.json())

morgan.token('body', (request) => {
  return request.body ? JSON.stringify(request.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/columns', columnsRouter)
app.use('/api/tasks', tasksRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app