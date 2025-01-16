/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Header from './components/Header'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs]                 = useState([])
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginUser, setLoginUser]         = useState(null)

  //Login
  const handleChangeUsername = ({ target }) => setLoginUsername(target.value)
  const handleChangePassword = ({ target}) => setLoginPassword(target.value)
  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username:loginUsername, password:loginPassword })
      blogService.setToken(user.token)
      setLoginUser(user)
      setLoginUsername('')
      setLoginPassword('')

      blogService.getAll()
      .then(allBlogs => {
        setBlogs(allBlogs)
      })

    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <>
      <Header text='Blogs' />
      <LoginForm 
        username={loginUsername}
        password={loginPassword}
        handleChangeUsername={handleChangeUsername}
        handleChangePassword={handleChangePassword}
        handleLoginSubmit={handleLogin}/>
      
      {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
    </>
  )
}

export default App
