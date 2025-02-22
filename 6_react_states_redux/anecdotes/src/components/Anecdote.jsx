import { useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notificationMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = () => {
        dispatch(anecdoteVote(anecdote.id))
        dispatch(notificationMessage(`Voted anecdote: ${anecdote.content}`))

        setTimeout(() => {
            dispatch(notificationMessage(''))
        }, 3000)
    }

    return (
        <div>
            <p>{anecdote.content}</p>
            <p>Has {anecdote.votes} votes</p>
            <button onClick={vote}>vote</button>
        </div>
    )
}

export default Anecdote