import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        blogAdd(state, action) {
            state.push(action.payload)
        },
        blogUpdate(state, action) {
            const updatedBlog = action.payload
            return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
        },
        blogSetAll(state, action) {
            return action.payload
        },
        blogDelete(state, action) {
            const deletedBlog = action.payload
            return state.filter(blog => blog.id !== deletedBlog.id)
        },
        blogAddComment(state, action) {
            const newCommentBlog = state.find(blog => blog.id === action.payload.blog)
            newCommentBlog.comments.push(action.payload)
        }
    }
})

export const blogsInit = loginCredentials => {
    return async dispatch => {
        const blogs = await blogService.getAll(loginCredentials.token)
        dispatch(blogSetAll(blogs))
    }
}

export const blogsCreate = (blog, token) => {
    return async dispatch => {
        const createdBlog = await blogService.createBlog(blog, token)
        dispatch(blogAdd(createdBlog))
    }
}

export const blogsLike = (updatedBlobObj, token) => {
    return async dispatch => {
        await blogService.updateBlog(updatedBlobObj, updatedBlobObj.id, token)
        dispatch(blogUpdate(updatedBlobObj))
    }
}

export const blogComment = (commentObj, blogId, token) => {
    return async dispatch => {
        const createdComment = await blogService.createBlogComment(commentObj, blogId, token)
        dispatch(blogAddComment(createdComment))
    }
}

export const { blogSetAll, blogUpdate, blogAdd, blogDelete, blogAddComment } = blogsSlice.actions
export default blogsSlice.reducer