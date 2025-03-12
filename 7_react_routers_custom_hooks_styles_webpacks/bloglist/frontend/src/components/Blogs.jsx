import { useSelector } from 'react-redux'
import { Badge, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Header from './Header'

const Blogs = () => {
    const blogs = useSelector((state) => state.blogs)

    return (
        <div className="container bg-light p-3">
            <Header message="Blogs" />
            <ListGroup as="ul">
                {blogs.map((blog) => (
                    <ListGroup.Item
                        key={blog.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start mt-1"
                        onMouseEnter={(e) =>
                            (e.target.style.transform = 'scale(1.02)')
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.transform = 'scale(1)')
                        }
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <Link to={`/blogs/${blog.id}`}>
                                    {blog.title}
                                </Link>
                            </div>
                            {blog.author}
                        </div>
                        <Badge bg="primary" pill>
                            Comments: {blog.comments.length}
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Blogs
