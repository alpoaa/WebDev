import axios from 'axios'

const baseUrl = '/api/notes'
let token     = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const create = async newObject => {
    const config = { headers: { Authorization: token }}
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    setToken
}