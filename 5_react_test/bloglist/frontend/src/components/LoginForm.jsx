/* eslint-disable react/prop-types */
import Header from './Header'
const LoginForm = ({ loginUser, username, password, handleChangeUsername, handleChangePassword, handleLoginSubmit }) => {
    if (loginUser !== null) {
        return null
    }

    return (
        <>
        <Header text='Log in to application' />
        <form onSubmit={handleLoginSubmit}>
            <div>
                <p>Username</p>
                <input type="text" value={username} name="Username" onChange={handleChangeUsername}/>
            </div>
            <div>
                <p>Password</p>
                <input type="password" value={password} name="Password" onChange={handleChangePassword}/>
            </div>
            <br/>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default LoginForm