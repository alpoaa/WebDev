import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationMessage(state, action) {
            state = action.payload
            return state
        }
    }
})

export const { notificationMessage } = notificationSlice.actions
export default notificationSlice.reducer