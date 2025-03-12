import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogsCreate } from '../reducers/blogsReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { signOut } from '../reducers/loggedUserReducer'
import Header from './Header'

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

        try {
            const newBlogObj = { title, author, url, likes }

            dispatch(blogsCreate(newBlogObj, loggedUser))
            dispatch(sendNotification(`Created blog ${title} by ${author}!`))
            setTitle('')
            setAuthor('')
            setUrl('')
            setLikes(0)
        } catch (exception) {
            dispatch(sendNotification(`${exception.response.data.error}`))
            dispatch(signOut())
        }
    }

    return (
        <div className="container bg-light p-3">
            <Header message="Create a new blog" />
            <Form onSubmit={createNew}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        onChange={handleChangeTitle}
                        value={title}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        onChange={handleChangeAuthor}
                        value={author}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        onChange={handleChangeUrl}
                        value={url}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Likes</Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        name="likes"
                        onChange={handleChangeLikes}
                        value={likes}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreateBlog
