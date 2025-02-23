/* eslint-disable react/prop-types */
import { useField } from '../hooks'

import Header from './Header'

const AnecdoteCreate = ({ createNew }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newObj = {
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        }
        createNew(newObj)
    }

    const resetValues = (event) => {
        event.preventDefault()
        content.onReset()
        author.onReset()
        info.onReset()
    }
 
    return (
        <div>
            <Header text='Create a new anecdote' />
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Content</p>
                    <input {...content} />
                </div>
                <div>
                    <p>Author</p>
                    <input {...author} />
                </div>
                <div>
                    <p>URL for more info</p>
                    <input {...info} />
                </div>
                <button type='submit'>Create</button>
                <button onClick={resetValues}>Reset</button>
            </form>
        </div>
    )
}

export default AnecdoteCreate