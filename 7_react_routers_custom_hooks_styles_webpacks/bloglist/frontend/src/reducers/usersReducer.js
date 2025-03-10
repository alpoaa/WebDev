import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        usersSetAll(state, action) {
            return action.payload
        }
    }
})

export const usersInit = (loginCredentials) => {
    return async dispatch => {
        const users = await usersService.getAll(loginCredentials.token)
        dispatch(usersSetAll(users))
    }
}

export const { usersSetAll } = usersSlice.actions
export default usersSlice.reducer