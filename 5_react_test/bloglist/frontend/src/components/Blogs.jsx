import PropTypes from 'prop-types'
import Blog from './Blog'
import Header from './Header'

const Blogs = ({ loginUser, blogs, likeBlog, deleteBlog }) => {
    if (loginUser === null) {
        return null
    }

    return (
        <div data-testid="blogs">
            <Header text='Blogs' />
            {blogs
                .sort((next, prev) => next.likes > prev.likes ? -1 : 0)
                .map(blog => <Blog key={blog.id} loginUser={loginUser} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} /> )}
        </div>
    )
}

Blogs.propTypes = {
    loginUser: PropTypes.exact({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    blogs: PropTypes.array.isRequired,
    likeBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blogs