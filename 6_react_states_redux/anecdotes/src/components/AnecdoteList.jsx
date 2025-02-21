import { useSelector } from 'react-redux'

import Anecdote from './Anecdote'

const AnecdoteList = () => {
    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (!filter) {
            return anecdotes
        }

        return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    })

    return (
        <div>
            {anecdotes
            .sort((cur, prev) => prev.votes - cur.votes)
            .map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </div>
    )
}

export default AnecdoteList