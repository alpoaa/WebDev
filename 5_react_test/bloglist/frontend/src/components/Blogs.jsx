/* eslint-disable react/prop-types */
import Blog from './Blog'
import Header from './Header'

const Blogs = ({ loginUser, blogs, likeBlog, deleteBlog }) => {
    if (loginUser === null) {
        return null
    }

    return (
        <>
            <Header text='Blogs' />
            {blogs
                .sort((next, prev) => next.likes > prev.likes ? -1 : 0)
                .map(blog => <Blog key={blog.id} loginUser={loginUser} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} /> )}
        </>
    )
}

export default Blogs