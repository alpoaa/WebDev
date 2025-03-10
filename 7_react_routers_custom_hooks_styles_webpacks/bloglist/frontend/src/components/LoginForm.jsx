import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { signIn } from '../reducers/loggedUserReducer'
import { usersInit } from '../reducers/usersReducer'
import { blogsInit } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'

import Header from './Header'

const LoginForm = () => {
    const user = useSelector((state) => state.loggedUser)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeUsername = (event) => setUsername(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)

    const login = async (event) => {
        event.preventDefault()

        //TODO: try-catch -> if logging fails -> notification
        const credentials = { username, password }
        const loginCredentials = await loginService.login(credentials)

        dispatch(signIn(loginCredentials))
        dispatch(usersInit(loginCredentials))
        dispatch(blogsInit(loginCredentials))
        dispatch(sendNotification(`Signed in as ${loginCredentials.name}`))

        setUsername('')
        setPassword('')
    }

    //if (user) return null

    return (
        <>
            <Header message="Sign in to application" />
            <form onSubmit={login}>
                <div>
                    <p>Username</p>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleChangeUsername}
                    />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handleChangePassword}
                    />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm
