/* eslint-disable react/prop-types */
import { useState } from 'react'

import Header from './Header'

const AnecdoteCreate = ({ creteNew }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        creteNew({ content, author, info, votes: 0 })
        setContent('')
        setAuthor('')
        setInfo('')
    }

    return (
        <div>
            <Header text='Create a new anecdote' />
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Content</p>
                    <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    <p>Author</p>
                    <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <p>URL for more info</p>
                    <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default AnecdoteCreate