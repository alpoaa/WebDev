import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getAnecdote = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = async(anecdote) => {
    const newObj = { content: anecdote, votes: 0 }
    const response = await axios.post(baseUrl, newObj)
    return response.data
}

const update = async(anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default { getAll, getAnecdote, create, update }