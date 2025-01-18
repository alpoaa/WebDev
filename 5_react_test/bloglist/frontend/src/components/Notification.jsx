/* eslint-disable react/prop-types */
import '../styles/notification.css'
const Notification = ({ message, notifType }) => {

    if (message === '') {
        return null
    }
    
    return (
        <div className={notifType}>
            <p>{message}</p>
        </div>
    )
}

export default Notification