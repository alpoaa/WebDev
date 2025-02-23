/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Header from './Header'

const AnecdoteList = ({ anecdotes }) => {
    return (
        <div>
            <Header text='Anecdotes' />
            <ul>
                {anecdotes.map(anecdote => 
                    <li key={anecdote.id}>
                        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default AnecdoteList