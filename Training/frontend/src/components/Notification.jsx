
import '../styles/notification.css'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            <p>{message}</p>
        </div>
    )
}

export default Notification