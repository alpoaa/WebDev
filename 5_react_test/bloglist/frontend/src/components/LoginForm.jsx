import PropTypes from 'prop-types'
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
                <input data-testid="username" type="text" value={username} name="Username" onChange={handleChangeUsername}/>
            </div>
            <div>
                <p>Password</p>
                <input data-testid="password" type="password" value={password} name="Password" onChange={handleChangePassword}/>
            </div>
            <br/>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

LoginForm.propTypes = {
    loginUser: PropTypes.exact({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChangeUsername: PropTypes.func.isRequired,
    handleChangePassword: PropTypes.func.isRequired,
    handleLoginSubmit: PropTypes.func.isRequired
}

export default LoginForm