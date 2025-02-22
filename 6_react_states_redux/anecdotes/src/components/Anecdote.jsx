import { useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = () => {
        dispatch(anecdoteVote(anecdote.id))
        dispatch(sendNotification(`Voted anecdote: ${anecdote.content}`, 3))
        /*
        setTimeout(() => {
            dispatch(notificationMessage(''))
        }, 3000)
        */
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