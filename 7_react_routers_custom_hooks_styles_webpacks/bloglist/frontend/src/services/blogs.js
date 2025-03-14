import axios from 'axios'

//let token = null
const baseUrl = '/api/blogs'

//const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = async(token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.get(baseUrl, requestConfig)
    return response.data
}

const getBlog = async (blogId, token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.get(`${baseUrl}/${blogId}`, requestConfig)
    return response.data
}

const createBlog = async (newBlogObj, token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.post(baseUrl, newBlogObj, requestConfig)
    return response.data
}

const updateBlog = async(updatedBlog, blogId, token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, requestConfig)
    return response.data
}

const deleteBlog = async (blogId, token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.delete(`${baseUrl}/${blogId}`, requestConfig)
    return response.data
}

const createBlogComment = async(commentObj, blogId, token) => {
    const bearerToken = `Bearer ${token}`
    const requestConfig = { headers: { Authorization: bearerToken } }
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObj, requestConfig)
    return response.data
}

export default {
    getAll,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    createBlogComment
}

