import PropTypes from 'prop-types'
import Header from './Header'

const User = ({ user }) => {
    if (!user) return null

    return (
        <div>
            <Header message={user.name} />
            <p>Added blogs</p>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
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
