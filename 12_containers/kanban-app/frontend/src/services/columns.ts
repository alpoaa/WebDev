import axios from "axios"
import type { ColumnId, NewColumn } from "../types/column"

const baseUrl = import.meta.env.BACKEND_URL //'http://localhost:3000/api'

const getAllColumns = async() => {
    const response = await axios.get(`${baseUrl}/columns`)
    return response.data
}

const getColumn = async(columnId: ColumnId) => {
    const response = await axios.get(`${baseUrl}/columns/${columnId}`)
    return response.data
}

const createColumn = async(newColumnObj: NewColumn) => {
    const response = await axios.post(`${baseUrl}/columns`, newColumnObj)
    return response.data
}

const updateColumn = async(updatedColumnObj: NewColumn, columnId: ColumnId) => {
    const response = await axios.put(`${baseUrl}/columns/${columnId}`, updatedColumnObj)
    return response.data
}

const deleteColumn = async(columnId: ColumnId) => {
    const response = await axios.delete(`${baseUrl}/columns/${columnId}`)
    return response.data
}

export default {
    getAllColumns,
    getColumn,
    createColumn,
    updateColumn,
    deleteColumn
}