const Header = ({ text }) => {
    if (!text) {
        return null;
    }

    return (
        <>
            <h4>{text}</h4>
        </>
    );
};

export default Header;
