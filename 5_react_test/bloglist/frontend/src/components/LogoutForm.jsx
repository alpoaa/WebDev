import PropTypes from 'prop-types'
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

LogoutForm.propTypes = {
    loginUser: PropTypes.exact({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    handleLogoutClick: PropTypes.func.isRequired
}

export default LogoutForm