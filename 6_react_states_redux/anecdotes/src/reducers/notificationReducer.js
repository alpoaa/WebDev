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

export const sendNotification = (message, clearMessageInSec) => {
    return async dispatch => {
        dispatch(setNotification(message))

        setTimeout(() => {
            dispatch(setNotification(''))
        }, clearMessageInSec * 1000)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer