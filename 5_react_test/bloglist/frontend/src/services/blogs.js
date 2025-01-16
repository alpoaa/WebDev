import axios from 'axios'
let   token         = null
const baseUrl       = '/api/blogs'
//const requestConfig = { headers: { Authorization: token }}

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async() => {
    const requestConfig = { headers: { Authorization: token }}
    const response = await axios.get(baseUrl, requestConfig)
    return response.data
}

export default { getAll, setToken }