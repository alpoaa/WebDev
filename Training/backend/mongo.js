const mongoose = require('mongoose')

if (process.argv.length < 4) {
  console.log('give password as argument')
  process.exit()
}

const user     = process.argv[2]
const password = process.argv[3]

const url = `mongodb+srv://${user}:${password}@webdev.perkp.mongodb.net/testnoteapp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Testing the mongo',
  important: true,
})

// eslint-disable-next-line no-unused-vars
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})