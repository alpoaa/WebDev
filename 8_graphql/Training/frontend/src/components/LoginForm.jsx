import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../util/queries";

const LoginForm = ({ setError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            console.log('token', token)
            setToken(token)
            localStorage.setItem('user-token', token)
        }
    }, [result.data])

    const submitLogin = async(event) => {
        event.preventDefault()

        login({ variables: { username, password }})
    }

    return (
        <>
            <form onSubmit={submitLogin}>
                <div>
                    <input value={username} placeholder="Username" onChange={({ target }) => setUsername(target.value) }/>
                </div>
                <div>
                    <input type='password' value={password} placeholder="Password" onChange={({ target }) => setPassword(target.value) }/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default LoginForm