import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { anecdoteSet } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

import Notification from './components/Notification'
import Header from './components/Header'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdotes => dispatch(anecdoteSet(anecdotes)))
  }, [])

  return (
    <div>
      <Header text='Anecdotes' />
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App