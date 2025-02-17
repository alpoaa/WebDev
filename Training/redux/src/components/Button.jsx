import PropTypes from 'prop-types'

const Button = ({ label, clickAction }) => {
    return (
        <>
            <button onClick={clickAction}>{label}</button>
        </>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    clickAction: PropTypes.func.isRequired
}

export default Button