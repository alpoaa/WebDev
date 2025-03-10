import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../reducers/loggedUserReducer'

import Header from './Header'

const Users = () => {
    const loggedUser = useSelector((state) => state.loggedUser)
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()

    if (!loggedUser) return null

    const handleClickLogout = () => dispatch(signOut())

    return (
        <>
            <Header message="Users" />
            <p>Signed in as {loggedUser.name}</p>
            <button onClick={handleClickLogout}>Logout</button>
            <h4>Blogs created</h4>
            {users.map((user) => (
                <div key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                    <p>Created blogs: {user.blogs.length}</p>
                </div>
            ))}
        </>
    )
}

export default Users
