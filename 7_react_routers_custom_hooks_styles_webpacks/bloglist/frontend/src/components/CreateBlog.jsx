import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogsCreate } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'

const CreateBlog = () => {
    const loggedUser = useSelector((state) => state.loggedUser)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    const handleChangeTitle = (event) => setTitle(event.target.value)
    const handleChangeAuthor = (event) => setAuthor(event.target.value)
    const handleChangeUrl = (event) => setUrl(event.target.value)
    const handleChangeLikes = (event) => setLikes(event.target.value)

    const createNew = async (event) => {
        event.preventDefault()

        const newBlogObj = { title, author, url, likes }
        //TODO: try-catch -> if creating fails, logout
        dispatch(blogsCreate(newBlogObj, loggedUser.token))
        dispatch(sendNotification(`Created blog ${title} by ${author}!`))

        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes(0)
    }

    return (
        <div>
            <form onSubmit={createNew}>
                <div>
                    <p>Title</p>
                    <input
                        type="text"
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder="Title"
                    />
                </div>
                <div>
                    <p>Author</p>
                    <input
                        type="text"
                        value={author}
                        onChange={handleChangeAuthor}
                        placeholder="Author"
                    />
                </div>
                <div>
                    <p>Url</p>
                    <input
                        type="text"
                        value={url}
                        onChange={handleChangeUrl}
                        placeholder="URL"
                    />
                </div>
                <div>
                    <p>Likes</p>
                    <input
                        type="number"
                        value={likes}
                        onChange={handleChangeLikes}
                        placeholder="Likes"
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog
