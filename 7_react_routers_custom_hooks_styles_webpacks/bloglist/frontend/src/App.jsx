import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { usersInit } from './reducers/usersReducer'
import { blogsInit } from './reducers/blogsReducer'
import { sendNotification } from './reducers/notificationReducer'
import { signOut } from './reducers/loggedUserReducer'

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
    const dispatch = useDispatch()

    if (loggedUser && !blogs.length && !users.length) {
        try {
            dispatch(usersInit(loggedUser))
            dispatch(blogsInit(loggedUser))
        } catch (exception) {
            dispatch(sendNotification(`${exception.response.data.error}`))
            dispatch(signOut())
        }
    }

    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find((blog) => blog.id === String(blogMatch.params.id))
        : null

    const userMatch = useMatch('/users/:id')
    const user = userMatch
        ? users.find((user) => user.id === String(userMatch.params.id))
        : null

    return (
        <div className="container">
            <Notification />
            <Navbar
                collapseOnSelect
                expand="lg"
                bg="secondary"
                className="p-2"
                data-bs-theme="dark"
            >
                <Navbar.Brand>
                    {loggedUser ? `Signed in as: ${loggedUser.name}` : null}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-3">
                        <Nav.Link href="#" as="span">
                            {!loggedUser ? (
                                <Link to="/signin">Sign in</Link>
                            ) : null}
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link to="/">Blogs</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link to="/create">Create blog</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link to="/users">Users</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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
        </div>
    )
}

export default App
