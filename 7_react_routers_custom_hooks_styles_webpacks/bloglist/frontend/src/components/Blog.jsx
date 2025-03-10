import PropTypes from 'prop-types'
import Header from './Header'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogsLike, blogComment } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.loggedUser)

    const handleClickLike = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        //TODO: try-catch block
        dispatch(blogsLike(updatedBlog, loggedUser.token))
    }

    const handleChangeComment = (event) => setComment(event.target.value)

    const handleClickComment = (event) => {
        event.preventDefault()

        const newCommentObj = { comment }
        dispatch(blogComment(newCommentObj, blog.id, loggedUser.token))
        setComment('')
    }

    return (
        <div>
            <Header message={`${blog.title} by ${blog.author}`} />
            <p>{blog.url}</p>
            <p>Added by: {blog.user.name}</p>
            <p>Has {blog.likes} likes</p>
            <button onClick={handleClickLike}>Like</button>
            <div>
                <h5>Comments</h5>
                <ul>
                    {blog.comments.map((comment) => (
                        <li key={comment.id}>{comment.comment}</li>
                    ))}
                </ul>

                <form onSubmit={handleClickComment}>
                    <input
                        type="text"
                        value={comment}
                        onChange={handleChangeComment}
                        placeholder="New Comment"
                    />
                    <button type="submit">Add comment</button>
                </form>
            </div>
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
