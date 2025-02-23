/* eslint-disable react/prop-types */
import Header from './Header'

const Anecdote = ({ anecdote }) => {
    if (!anecdote) return null

    return (
        <div>
            <Header text={anecdote.content} />
            <p>{anecdote.author}</p>
            <p>{anecdote.info}</p>
            <p>Has {anecdote.votes} votes</p>
        </div>
    )
}

export default Anecdote