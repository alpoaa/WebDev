import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import Header from './Header'

const User = ({ user }) => {
    if (!user) return null

    return (
        <div className="container bg-light p-3">
            <Header message={user.name} />
            <p>User added blogs</p>
            <ListGroup as="ul">
                {user.blogs.map((blog) => (
                    <ListGroup.Item
                        as="li"
                        key={blog.id}
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{blog.title}</div>
                            {blog.author}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

User.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        blogs: PropTypes.array,
    }),
}

export default User
