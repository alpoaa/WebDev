import axios from "axios"
import type { ColumnId, NewColumn } from "../types/column"

const baseUrl = 'http://localhost:3001/columns'

const getAllColumns = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getColumn = async(columnId: ColumnId) => {
    const response = await axios.get(`${baseUrl}/${columnId}`)
    return response.data
}

const createColumn = async(newColumnObj: NewColumn) => {
    const response = await axios.post(baseUrl, newColumnObj)
    return response.data
}

const updateColumn = async(updatedColumnObj: NewColumn, columnId: ColumnId) => {
    const response = await axios.put(`${baseUrl}/${columnId}`, updatedColumnObj)
    return response.data
}

const deleteColumn = async(columnId: ColumnId) => {
    const response = await axios.delete(`${baseUrl}/${columnId}`)
    return response.data
}

export default {
    getAllColumns,
    getColumn,
    createColumn,
    updateColumn,
    deleteColumn
}