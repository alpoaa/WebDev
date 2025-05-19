const tasksRouter = require('express').Router()
const Task = require('../models/task')
const Column = require('../models/column')
const { default: mongoose } = require('mongoose')

tasksRouter.get('/', async(req, res) => {
    const tasks = await Task.find({}).populate('columnId', { title: 1 })
    res.json(tasks)
})

tasksRouter.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id)

    if (task) {
        res.json(task)
    } else {
        res.status(404).end()
    }
})

tasksRouter.post('/', async(req, res) => {
    const { body } = req
    const column = await Column.findById(body.columnId)

    if (column) {
        const newTask = new Task({
            task: body.task,
            description: body.description,
            dueDate: body.dueDate,
            columnId: column._id,
            assigned: body.assigned
        })

        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    } else {
        res.status(400).json({ error: `Column identification not provided in the request or it is invalid: ${body.columnId}` })
    }

    
})

tasksRouter.put('/:id', async(req, res) => {
    const { body } = req
    const reqTask = {
        task: body.task,
        columnId: body.columnId,
        dueDate: body.dueDate,
        assigned: body.assigned,
        description: body.description
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, reqTask, { new: true })
    res.json(updatedTask)
})

tasksRouter.delete('/:id', async(req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = tasksRouter