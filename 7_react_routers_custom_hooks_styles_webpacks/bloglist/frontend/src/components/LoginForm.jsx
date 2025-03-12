import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { signIn } from '../reducers/loggedUserReducer'
import { usersInit } from '../reducers/usersReducer'
import { blogsInit } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import Header from './Header'

const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeUsername = (event) => setUsername(event.target.value)
    const handleChangePassword = (event) => setPassword(event.target.value)

    const login = async (event) => {
        event.preventDefault()

        try {
            const credentials = { username, password }
            const loginCredentials = await loginService.login(credentials)

            dispatch(signIn(loginCredentials))
            dispatch(usersInit(loginCredentials))
            dispatch(blogsInit(loginCredentials))
            dispatch(sendNotification(`Signed in as ${loginCredentials.name}`))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(sendNotification(`${exception.response.data.error}`))
        }
    }

    return (
        <div className="container bg-warning p-2">
            <Header message="Sign in to application" />
            <Form onSubmit={login} className="p-2">
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        onChange={handleChangeUsername}
                        value={username}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={handleChangePassword}
                        value={password}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
