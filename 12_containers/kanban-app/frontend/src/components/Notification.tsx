import type { NotificationType } from "../types/notification"

import ErrorIcon from "./ErrorIcon"
import BellIcon from "./BellIcon"

const Notification = ({ notification, type }: {
    notification: string,
    type: NotificationType
}) => {
    if (!notification || type === null) {
        return null
    }

    if (type === 'error') {
        return (
            <div className="flex gap-2 rounded-lg p-2 m-2 border-2 bg-red-300">
                <ErrorIcon />
                <label>{notification}</label>
            </div>
        )
    }
    
    return (
        <div className="flex gap-2 rounded-lg p-2 m-2 border-2 bg-blue-300">
            <BellIcon />
            <label>{notification}</label>
        </div>
    )
}

export default Notification