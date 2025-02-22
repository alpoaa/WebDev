/* eslint-disable react/prop-types */
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateAnecdote } from '../services/requests'
import { useNotification } from '../NotificationContext'

const Anecdote = ({ anecdote }) => {
    const queryClient = useQueryClient()
    const { dispatch } = useNotification()

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            dispatch({ type: 'SHOW', payload: `anecdote ${anecdote.content} voted` })
        }
    })
    
    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    if (!anecdote) {
        return null
    }
    
    return (
        <div>
            <div>
                <p>{anecdote.content}</p>
                <p>Has {anecdote.votes} votes</p>
            </div>
            <div>
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote