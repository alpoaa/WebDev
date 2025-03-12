import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        usersSetAll(state, action) {
            return action.payload
        },
        usersAddBlog(state, action) {
            const currentUser = state.find(user => user.username === action.payload.username)
            currentUser.blogs.push(action.payload.blog)
        }
    }
})

export const usersInit = (loginCredentials) => {
    return async dispatch => {
        const users = await usersService.getAll(loginCredentials.token)
        dispatch(usersSetAll(users))
    }
}

export const usersAddBlogCreate = (loggedUser, blog) => {
    return dispatch => {
        const newBlogUserObj = { username: loggedUser.username, blog }
        dispatch(usersAddBlog(newBlogUserObj))
    }
}

export const { usersSetAll, usersAddBlog } = usersSlice.actions
export default usersSlice.reducer