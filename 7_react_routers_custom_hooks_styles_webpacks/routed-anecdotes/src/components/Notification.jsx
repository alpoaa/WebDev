/* eslint-disable react/prop-types */
const Notification = ({ message }) => {
    if (!message) return null

    return (
        <div>
            <p>{message}</p>
        </div>
    )
}

export default Notification