import PropTypes from 'prop-types'

const Header = ({ message }) => {
    if (!message) return null

    return (
        <>
            <h3>{message}</h3>
        </>
    )
}

Header.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Header
