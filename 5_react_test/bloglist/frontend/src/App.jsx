/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

//Services
import blogService from './services/blogs'
import loginService from './services/login'

//Components
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import CreateBlogForm from './components/CreateBlogForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs]                 = useState([])
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginUser, setLoginUser]         = useState(null)
  const [notifMessage, setNotifMessage]   = useState('')
  const [notifType, setNotifType]         = useState('')
  
  //Create blog
  const [createBlogTitle, setCreateBlogTitle]   = useState('')
  const [createBlogAuthor, setCreateBlogAuthor] = useState('')
  const [createBlogUrl, setCreateBlogUrl]       = useState('')

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
  const handleChangePassword = ({ target}) => setLoginPassword(target.value)
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
  const handleChangeCreateBlogTitle = ({ target }) => setCreateBlogTitle(target.value)
  const handleChangeCreateBlogAuthor = ({ target }) => setCreateBlogAuthor(target.value)
  const handleChangeCreateBlogUrl = ({ target }) => setCreateBlogUrl(target.value)
  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: createBlogTitle,
        author: createBlogAuthor,
        url: createBlogUrl
      }
  
      const createdBlog = await blogService.createBlog(newBlog)
      
      if (createdBlog) {
        setBlogs(blogs.concat(createdBlog))
      }
  
      setCreateBlogTitle('')
      setCreateBlogAuthor('')
      setCreateBlogUrl('')
      sendNotification(`Created blog: ${newBlog.title} by ${newBlog.author}`, 'info')
    } catch (exception) {
      setLoginUser(null)
      blogService.setToken(null)
      sendNotification(exception.response.data.error, 'error')
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
      <CreateBlogForm 
        loginUser={loginUser}
        handleCreateBlog={handleCreateBlog}
        title={createBlogTitle}
        author={createBlogAuthor}
        url={createBlogUrl}
        handleChangeTitle={handleChangeCreateBlogTitle}
        handleChangeAuthor={handleChangeCreateBlogAuthor}
        handleChangeUrl={handleChangeCreateBlogUrl} />

      <Blogs loginUser={loginUser} blogs={blogs} handleLogoutClick={handleLogoutClick} />
      
    </>
  )
}

export default App
