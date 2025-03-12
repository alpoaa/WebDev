import PropTypes from 'prop-types'

const Header = ({ message }) => {
    if (!message) return null

    return (
        <div>
            <h3>{message}</h3>
        </div>
    )
}

Header.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Header
