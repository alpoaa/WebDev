import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async() => await axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async anecdote => await axios.post(baseUrl, anecdote).then(res => res.data)

export const updateAnecdote = async anecdote => await axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)