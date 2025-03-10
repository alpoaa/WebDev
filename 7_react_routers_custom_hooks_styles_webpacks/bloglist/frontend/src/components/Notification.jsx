import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)

    if (!notification) return null

    const notifStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }

    return (
        <div style={notifStyle}>
            <p>{notification}</p>
        </div>
    )
}

export default Notification
