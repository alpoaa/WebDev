import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'

import User from './components/User'
import Users from './components/Users'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
    const loggedUser = useSelector((state) => state.loggedUser)
    const blogs = useSelector((state) => state.blogs)
    const users = useSelector((state) => state.users)

    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find((blog) => blog.id === String(blogMatch.params.id))
        : null

    const userMatch = useMatch('/users/:id')
    const user = userMatch
        ? users.find((user) => user.id === String(userMatch.params.id))
        : null

    return (
        <>
            <Notification />
            <>
                {!loggedUser ? <Link to="/signin">Sign in</Link> : null}
                <Link to="/">Blogs</Link>
                <Link to="/create">Create blog</Link>
                <Link to="/users">Users</Link>
            </>
            <Routes>
                <Route
                    path="/blogs/:id"
                    element={
                        loggedUser ? (
                            <Blog blog={blog} />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/users/:id"
                    element={
                        loggedUser ? (
                            <User user={user} />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/"
                    element={loggedUser ? <Blogs /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/create"
                    element={
                        loggedUser ? <CreateBlog /> : <Navigate to="/signin" />
                    }
                />
                <Route
                    path="/users"
                    element={loggedUser ? <Users /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/signin"
                    element={!loggedUser ? <LoginForm /> : <Navigate to="/" />}
                />
            </Routes>
            <Footer />
        </>
    )
}

export default App
