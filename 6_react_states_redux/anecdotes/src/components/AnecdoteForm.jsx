import { useDispatch } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

import Header from './Header'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async(event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(anecdoteCreate(anecdote))
        dispatch(sendNotification(`Created new anecdote: ${anecdote}`, 3))
    }

    return (
        <form onSubmit={create}>
            <Header text='Create new' />
            <input name="anecdote" />
            <button type="submit">create</button>
      </form>
    )
}

export default AnecdoteForm