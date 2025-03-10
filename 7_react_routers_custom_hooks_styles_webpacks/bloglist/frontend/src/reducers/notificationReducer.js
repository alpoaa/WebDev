import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return state
        }
    }
})

export const sendNotification = message => {
    return async dispatch => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(setNotification(''))
        }, 4000)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer