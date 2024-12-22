require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const app     = express()
const Note    = require('./models/note')

app.use(cors())
app.use(express.json())

let notes = []

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

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

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id)
  .then(note => {
    res.json(note)
  })
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

app.post('/api/notes', (req, res) => {
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
  //notes = notes.concat(note)
  //res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})