import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './Header'

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <div>
            <Header message="Blogs" />
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title} by {blog.author}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Blogs
