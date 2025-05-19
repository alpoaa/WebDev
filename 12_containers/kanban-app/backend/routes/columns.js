const columnRouter = require('express').Router()
const Column = require('../models/column')

columnRouter.get('/', async(req, res) => {
    const columns = await Column.find({})
    res.json(columns)
})

columnRouter.get('/:id', async(req, res) => {
    const column = await Column.findById(req.params.id)

    if (column) {
        res.json(column)
    } else {
        res.status(404).end()
    }
})

columnRouter.post('/', async(req, res) => {
    const { body } = req
    const newColumn = new Column({
        title: body.title
    })

    const savedColumn = await newColumn.save()

    res.status(201).json(savedColumn)
})

columnRouter.put('/:id', async(req, res) => {
    const { body } = req
    const reqColumn = { title: body.title }
    const updatedColumn = await Column.findByIdAndUpdate(req.params.id, reqColumn, { new: true })
    res.json(updatedColumn)
})

columnRouter.delete('/:id', async(req, res) => {
    await Column.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = columnRouter