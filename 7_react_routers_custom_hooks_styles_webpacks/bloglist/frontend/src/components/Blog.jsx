import PropTypes from 'prop-types'
import Header from './Header'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogsLike, blogComment } from '../reducers/blogsReducer'
import { signOut } from '../reducers/loggedUserReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { Row, Col, Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.loggedUser)

    const handleClickLike = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }

        try {
            dispatch(blogsLike(updatedBlog, loggedUser.token))
            dispatch(sendNotification('Liked blog!'))
        } catch (exception) {
            dispatch(sendNotification(`${exception.response.data.error}`))
            dispatch(signOut())
        }
    }

    const handleChangeComment = (event) => setComment(event.target.value)

    const handleClickComment = (event) => {
        event.preventDefault()

        try {
            const newCommentObj = { comment }
            dispatch(blogComment(newCommentObj, blog.id, loggedUser.token))
            dispatch(sendNotification(`Added comment, ${comment} to blog!`))
            setComment('')
        } catch (exception) {
            dispatch(sendNotification(`${exception.response.data.error}`))
            dispatch(signOut())
        }
    }

    return (
        <div className="container bg-light p-3">
            <Row>
                <Col sm={8}>
                    <Header message={`${blog.title} by ${blog.author}`} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Url: {blog.url}</p>
                    <p>Added by: {blog.user.name}</p>
                    <p>Has {blog.likes} likes</p>
                    <Button onClick={handleClickLike}>Like</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <h5 className="mt-2">Comments</h5>
                    <ListGroup as="ul">
                        {blog.comments.map((comment) => (
                            <ListGroup.Item key={comment.id} as="li">
                                {comment.comment}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Form onSubmit={handleClickComment} className="mt-2">
                        <Form.Group>
                            <Form.Label>Add new comment:</Form.Label>
                            <Form.Control
                                type="text"
                                name="comment"
                                value={comment}
                                onChange={handleChangeComment}
                            />
                            <Button type="submit" className="mt-3">
                                Add comment
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
        likes: PropTypes.number.isRequired,
        comments: PropTypes.array,
        id: PropTypes.string.isRequired,
    }),
}

export default Blog
