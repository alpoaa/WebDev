import axios from "axios"

const baseUrl = 'http://localhost:3001/tasks'

const getAllTasks = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getTask = async(taskId) => {
    const response = await axios.get(`${baseUrl}/${taskId}`)
    return response.data
}

const createTask = async(newTaskObj) => {
    const response = await axios.post(baseUrl, newTaskObj)
    return response.data
}

const updateTask = async(updatedTaskObj, taskId) => {
    const response = await axios.put(`${baseUrl}/${taskId}`, updatedTaskObj)
    return response.data
}

const deleteTask = async(taskId) => {
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