import { useDispatch } from 'react-redux'
import { anecdoteCreate } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

import Header from './Header'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async(event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.create(anecdote)
        dispatch(anecdoteCreate(newAnecdote))
        dispatch(notificationMessage(`Created new anecdote: ${anecdote}`))

        setTimeout(() => {
            dispatch(notificationMessage(''))
        }, 3000)
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