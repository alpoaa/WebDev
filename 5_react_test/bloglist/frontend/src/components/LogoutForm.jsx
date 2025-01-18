/* eslint-disable react/prop-types */
import Header from './Header'

const LogoutForm = ({ loginUser, handleLogoutClick }) => {
    if (loginUser === null) {
        return null
    }

    return (
        <>
            <Header text='Signed in' />
            <p><strong>{loginUser.name}</strong> logged in</p>
            <button onClick={handleLogoutClick}>Logout</button>
        </>
    )
}

export default LogoutForm