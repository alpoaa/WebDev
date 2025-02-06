/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'

//Services
import blogService from './services/blogs'
import loginService from './services/login'

//Components
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import CreateBlogForm from './components/CreateBlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs]                 = useState([])
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginUser, setLoginUser]         = useState(null)
  const [notifMessage, setNotifMessage]   = useState('')
  const [notifType, setNotifType]         = useState('')

  const blogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoginUser(user)
      blogService.setToken(user.token)
      blogService.getAll()
      .then(allBlogs => {
        setBlogs(allBlogs)
      })
      .catch(exception => {
        window.localStorage.removeItem('loggedAppUser')
        setLoginUser(null)
        blogService.setToken(null)
      })
    }
  }, [])

  const sendNotification = (message, type) => {
    setNotifMessage(message)
    setNotifType(type)

    setTimeout(() => {
      setNotifMessage('')
      setNotifType('')
    }, 2000)
  }

  //Login
  const handleChangeUsername = ({ target }) => setLoginUsername(target.value)
  const handleChangePassword = ({ target }) => setLoginPassword(target.value)
  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username:loginUsername, password:loginPassword })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setLoginUser(user)
      setLoginUsername('')
      setLoginPassword('')

      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      sendNotification(`Logged in as ${user.name}`, 'info')

    } catch (exception) {
      setLoginUser(null)
      blogService.setToken(null)
      sendNotification(exception.response.data.error, 'error')
      setLoginUser(null)
      setLoginUsername('')
      setLoginPassword('')
    }
  }

  //Logout
  const handleLogoutClick = () => {
    setLoginUser(null)
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken(null)
    sendNotification('Logged out', 'info')
  }

  //Create blog
  const createBlog = async (newBlogObj) => {
    blogRef.current.toggleVisibility()

    try {
      const createdBlog = await blogService.createBlog(newBlogObj)

      if (createdBlog) {
        //setBlogs(blogs.concat(createdBlog))
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
      }

      sendNotification(`Created blog: ${newBlogObj.title} by ${newBlogObj.author}`, 'info')
    } catch (exception) {
      setLoginUser(null)
      blogService.setToken(null)
      sendNotification(exception.response.data.error, 'error')
    }
  }

  //Like blog
  const likeBlog = async (updatedBlogObj, blogId) => {
    try {
      const updatedBlog = await blogService.updateBlog(updatedBlogObj, blogId)
      const newBlogs    = blogs.map(blog => blog.id === blogId ? { ...blog, likes: updatedBlog.likes } : blog)
      setBlogs(newBlogs)
    } catch (exception) {
      sendNotification(exception.response.data.error, 'error')
    }
  }

  //Delete blog
  const deleteBlog = async (deleteBlog) => {
    try {
      await blogService.deleteBlog(deleteBlog.id)
      setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
      sendNotification(`Successfully deleted blog ${deleteBlog.title}`, 'info')
    } catch (exception) {
      sendNotification(exception.response.error.data, 'error')
    }
  }


  return (
    <>
      <Notification message={notifMessage} notifType={notifType} />
      <LoginForm
        loginUser={loginUser}
        username={loginUsername}
        password={loginPassword}
        handleChangeUsername={handleChangeUsername}
        handleChangePassword={handleChangePassword}
        handleLoginSubmit={handleLogin}/>

      <LogoutForm loginUser={loginUser} handleLogoutClick={handleLogoutClick} />
      <Togglable user={loginUser} buttonLabel='Create blog' ref={blogRef}>
        <CreateBlogForm
          loginUser={loginUser}
          createBlog={createBlog} />
      </Togglable>

      <Blogs loginUser={loginUser} blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog}/>

    </>
  )
}

export default App
