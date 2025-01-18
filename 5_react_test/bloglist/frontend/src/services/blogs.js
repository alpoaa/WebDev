import axios from 'axios'
let   token         = null
const baseUrl       = '/api/blogs'

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async() => {
    const requestConfig = { headers: { Authorization: token }}
    const response = await axios.get(baseUrl, requestConfig)
    return response.data
}

const getBlog = async blogId => {
    const requestConfig = { headers: { Authorization: token }}
    const response = await axios.get(`${baseUrl}/${blogId}`, requestConfig)
    return response.data
}

const createBlog = async newBlogObj => {
    const requestConfig = { headers: { Authorization: token }}
    const response = await axios.post(baseUrl, newBlogObj, requestConfig)
    return response.data
}

const updateBlog = async(updatedBlog, blogId) => {
    const requestConfig = { headers: { Authorization: token }}
    const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, requestConfig)
    return response.data 
}

const deleteBlog = async blogId => {
    const requestConfig = { headers: { Authorization: token }}
    const response = await axios.delete(`${baseUrl}/${blogId}`, requestConfig)
    return response.data
}

export default { 
    getAll, 
    setToken,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}