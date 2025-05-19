const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    },
    task: {
        type: String,
        required: true,
        minlength: 5
    },
    dueDate: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assigned: {
        type: String
    }
})

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Task', taskSchema)