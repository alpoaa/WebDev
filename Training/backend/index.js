require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const app     = express()
const Note    = require('./models/note')

app.use(cors())
app.use(express.json())

//let notes = []

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const errorHandler = (error, request , response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
/*
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}
*/

app.get('/', (req, res) => {
  res.send('<h1>Heippa</h1>')
})

app.get('/api/notes', (req, res) => {
  //res.json(notes)
  Note.find({})
    .then(notes => {
      res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  /*
  const id = req.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
      res.json(note)
  } else {
      res.status(401).end()
  }
  */


})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then(savedNote => {
      res.json(savedNote)
    })
    .catch(error => next(error))
  //notes = notes.concat(note)
  //res.json(note)
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
  /*
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
  */
})

app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})