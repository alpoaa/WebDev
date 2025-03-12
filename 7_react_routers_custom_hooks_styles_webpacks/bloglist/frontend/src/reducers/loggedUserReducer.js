/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const findLoggedUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return user
    }

    return null
}

const initialState = findLoggedUser()

const userSlice = createSlice({
    name: 'loggedUser',
    initialState: initialState,
    reducers: {
        userSet(state, action) {
            state = action.payload
            return state
        },
        userClear(state, action) {
            state = null
            window.localStorage.clear()
            return state
        },
        userGet(state, action) {
            return state
        }
    }
})

export const signIn = credentials => {
    return async dispatch => {
        window.localStorage.setItem('loggedAppUser', JSON.stringify(credentials))
        dispatch(userSet(credentials))
    }
}

export const signOut = () => {
    return dispatch => {
        dispatch(userClear())
    }
}


export const { userSet, userClear, userGet } = userSlice.actions
export default userSlice.reducer