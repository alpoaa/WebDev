/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from 'react-router-dom'

import Header from './components/Header'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import AnecdoteCreate from './components/AnecdoteCreate'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  const [createRedirect, setCreateRedirect] = useState(false)
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote, ${anecdote.content} created!`)
    setCreateRedirect(true)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null

  if (createRedirect) setTimeout(() => { setCreateRedirect(false)}, 1000)

  return (
    <div>
      <Header text='Software anecdotes' />
      <Notification message={notification} />
      <div>
        <Link to='/'>Anecdotes</Link>
        <Link to='/create'>Create new</Link>
        <Link to='/about'>About</Link>
      </div>

      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={ <AnecdoteList anecdotes={anecdotes} /> }/>
        <Route path='/create' element={createRedirect ? <Navigate to='/' /> : <AnecdoteCreate creteNew={addNew}/> } />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App