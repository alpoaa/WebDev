/* eslint-disable react/prop-types */
const LoginForm = ({ username, password, handleChangeUsername, handleChangePassword, handleLoginSubmit }) => (
    <>
    <form onSubmit={handleLoginSubmit}>
        <h4></h4>
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

export default LoginForm