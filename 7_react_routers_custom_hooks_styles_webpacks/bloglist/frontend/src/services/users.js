import axios from 'axios'

//let token = null
const baseUrl = '/api/users'

//const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async(token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.get(baseUrl, requestConfig)
    return response.data
}

const getUser = async (userId, token) => {
    const requestConfig = { headers: { Authorization: token } }
    const response = await axios.get(`${baseUrl}/${userId}`, requestConfig)
    return response.data
}

export default { getAll, getUser }