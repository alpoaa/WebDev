import PropTypes from 'prop-types'
import { useState } from 'react'
import Header from './Header'

const CreateBlogForm = ({ loginUser, createBlog }) => {
    const [title, setTitle]   = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl]       = useState('')

    const handleChangeTitle = ({ target }) => setTitle(target.value)
    const handleChangeAuthor = ({ target }) => setAuthor(target.value)
    const handleChangeUrl = ({ target }) => setUrl(target.value)

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title, author, url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    if (loginUser === null) {
        return null
    }

    return (
        <>
            <Header text='Create new blog' />
            <form onSubmit={addBlog}>
                <div>
                    <input placeholder='Title' type='text' value={title} onChange={handleChangeTitle} />
                </div>
                <div>
                    <input placeholder='Author' type='text' value={author} onChange={handleChangeAuthor} />
                </div>
                <div>
                    <input placeholder='URL' type='text' value={url} onChange={handleChangeUrl} />
                </div>
                <button type='submit'>Create</button>
            </form>
        </>
    )
}

CreateBlogForm.propTypes = {
    loginUser: PropTypes.exact({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm