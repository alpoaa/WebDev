import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from '../reducers/blogsReducer'
import loggedUserReducer from '../reducers/loggedUserReducer'
import usersReducer from '../reducers/usersReducer'
import notificationReducer from '../reducers/notificationReducer'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        loggedUser: loggedUserReducer,
        users: usersReducer,
        notification: notificationReducer
    }
})

export default store