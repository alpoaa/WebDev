// eslint-disable-next-line react/prop-types
const Header = ({ text }) => {
    if (!text) {
        return null
    }

    return (
        <>
            <h3>{text}</h3>
        </>
    )
}

export default Header