import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { anecdotesInit } from './reducers/anecdoteReducer'

import Notification from './components/Notification'
import Header from './components/Header'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(anecdotesInit())
  }, [dispatch])

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