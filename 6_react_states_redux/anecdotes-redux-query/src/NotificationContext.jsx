/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer, useContext } from 'react'

const initialState = {
    message: '',
    showNotification: false
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return { message: action.payload, showNotification: true }
        case 'HIDE':
            return { ...state, showNotification: false }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    return context
}

export default NotificationContext