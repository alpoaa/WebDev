import { useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const vote = () => dispatch(anecdoteVote(anecdote.id))

    return (
        <div>
            <p>{anecdote.content}</p>
            <p>Has {anecdote.votes} votes</p>
            <button onClick={vote}>vote</button>
        </div>
    )
}

export default Anecdote