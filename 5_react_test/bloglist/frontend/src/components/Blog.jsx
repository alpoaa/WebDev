import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/blog.css'

const Blog = ({ loginUser, blog, likeBlog, deleteBlog }) => {
    const [viewAll, setViewAll] = useState(false)

    const handleClickView = () => setViewAll(!viewAll)
    const handleClickLike = () => {
        const updatedBlogObj = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }

        likeBlog(updatedBlogObj, blog.id)
    }
    const handleClickDelete = () => {
        if (window.confirm(`Delete blog ${blog.title} by author ${blog.author}`)) {
            deleteBlog(blog)
        }
    }

    const showDeleteButton = { display: blog.user.username === loginUser.username ? '' : 'none' }

    return (
        <>
        {!viewAll &&
            <div className='blog blogSimple'>
                <p>{blog.author} - {blog.title}</p>
                <button onClick={handleClickView}>{viewAll ? 'Hide' : 'View'}</button>
            </div>
        }
        {viewAll &&
            <div className='blog blogAll'>
                <p>Created by {blog.user.name}</p>
                <p>{blog.author} - {blog.title}</p>
                <p>{blog.url}</p>
                <p>Likes: {blog.likes}</p>
                <button onClick={handleClickLike}>Like</button>
                <button onClick={handleClickView}>{viewAll ? 'Hide' : 'View'}</button>
                <button style={showDeleteButton} onClick={handleClickDelete}>Delete</button>
            </div>
        }
        </>
    )
}

Blog.propTypes = {
    loginUser: PropTypes.exact({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog