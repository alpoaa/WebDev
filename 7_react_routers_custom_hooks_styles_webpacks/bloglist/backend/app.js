const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware  = require('./utils/middleware')
const app = express()

const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)
logger.info('Connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected successfully...'))
    .catch((error) => logger.error('Error connecting into database: ', error.message))

morgan.token('body', (request) => request.body ? JSON.stringify(request.body) : '')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(middleware.requestExtractorToken)

app.use('/api/login', loginRouter)
app.use('/api/users', middleware.requestExtractorUser, userRouter)
app.use('/api/blogs', middleware.requestExtractorUser, blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app