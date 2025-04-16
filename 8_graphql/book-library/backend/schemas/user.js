const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    favoriteGenre: {
        type: String
    }
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })

module.exports = mongoose.model('User', schema)