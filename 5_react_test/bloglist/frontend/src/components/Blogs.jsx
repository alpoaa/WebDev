/* eslint-disable react/prop-types */
import Blog from './Blog'
import Header from './Header'

const Blogs = ({ loginUser, blogs }) => {
    if (loginUser === null) {
        return null
    }

    return (
        <>
            <Header text='Blogs' />
            {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
        </>
    )
}

export default Blogs