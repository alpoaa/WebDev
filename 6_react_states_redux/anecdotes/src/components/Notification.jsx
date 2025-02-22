import { useSelector } from 'react-redux'

const Notification = () => {
    const message = useSelector(state => state.notification)

    const notifStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    if (!message) {
        return null
    }

    return (
        <div style={ notifStyle }>
            <p>{message}</p>
        </div>
    )
}

export default Notification