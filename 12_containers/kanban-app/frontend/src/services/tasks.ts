import axios from "axios"
import type { Task, Id, NewTask } from "../types/task"

const baseUrl: string = 'http://localhost:3001/tasks'

const getAllTasks = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getTask = async(taskId: Id) => {
    const response = await axios.get(`${baseUrl}/${taskId}`)
    return response.data
}

const createTask = async(newTaskObj: NewTask) => {
    const response = await axios.post(baseUrl, newTaskObj)
    return response.data
}

const updateTask = async(updatedTaskObj: Task, taskId: Id) => {
    const response = await axios.put(`${baseUrl}/${taskId}`, updatedTaskObj)
    return response.data
}

const deleteTask = async(taskId: Id) => {
    const response = await axios.delete(`${baseUrl}/${taskId}`)
    return response.data
}

export default {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}