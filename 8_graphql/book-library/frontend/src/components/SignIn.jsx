import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/users";

import Header from "./Header";

const SignIn = ({ token, signin, sendNotif }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            sendNotif(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            localStorage.setItem('user-token', token)
            signin(token)
        }

    }, [result.data])

    if (token) {
        return null
    }

    const submitLogin = async(event) => {
        event.preventDefault()

        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <Header text='Sign in to application' />
            <form onSubmit={submitLogin}>
                <div>
                    <input placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value) } />
                </div>
                <div>
                    <input type='password' placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value) } />
                </div>
                <button type='submit'>Sign in</button>
            </form>
        </>
    )
}

export default SignIn