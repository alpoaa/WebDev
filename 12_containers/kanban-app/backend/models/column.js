const mongoose = require('mongoose')

const columnSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

columnSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Column', columnSchema)