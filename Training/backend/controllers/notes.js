const notesRouter = require('express').Router()
const Note        = require('../models/note')

notesRouter.get('/', async(request, response) => {
  const notes = await Note.find({})
  response.json(notes)
  /*
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
  */
})

notesRouter.get('/:id', async(request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)

    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
  /*
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
    */
})

notesRouter.post('/', async(request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
  /*
  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
  */
})

notesRouter.delete('/:id', async(request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
  /*
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
  */
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter
