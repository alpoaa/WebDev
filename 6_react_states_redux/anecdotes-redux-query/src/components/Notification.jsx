/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
//import { useContext } from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { state, dispatch } = useNotification()

  if (state.showNotification) {
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 4000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!state.showNotification) {
    return null
  }

  return (
    <div style={style}>
      <p>{state.message}</p>
    </div>
  )
}
  
export default Notification