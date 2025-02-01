import PropTypes from 'prop-types'

const Header = ({ text }) => (
    <>
        <h3>{text}</h3>
    </>
)

Header.propTypes = {
    text: PropTypes.string.isRequired
}

export default Header