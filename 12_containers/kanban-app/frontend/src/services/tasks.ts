import axios from "axios"
import type { Task, TaskId, NewTask } from "../types/task"

const baseUrl: string = import.meta.env.VITE_BACKEND_URL //'http://localhost:3000/api'

const getAllTasks = async() => {
    const response = await axios.get(`${baseUrl}/tasks`)
    return response.data
}

const getTask = async(taskId: TaskId) => {
    const response = await axios.get(`${baseUrl}/tasks/${taskId}`)
    return response.data
}

const createTask = async(newTaskObj: NewTask) => {
    const response = await axios.post(`${baseUrl}/tasks`, newTaskObj)
    return response.data
}

const updateTask = async(updatedTaskObj: Task, taskId: TaskId) => {
    const response = await axios.put(`${baseUrl}/tasks/${taskId}`, updatedTaskObj)
    return response.data
}

const deleteTask = async(taskId: TaskId) => {
    const response = await axios.delete(`${baseUrl}/tasks/${taskId}`)
    return response.data
}

export default {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}