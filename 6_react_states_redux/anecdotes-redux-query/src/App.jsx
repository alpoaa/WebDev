/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/requests'
import { NotificationContextProvider } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })

  if (result.isError) {
    return <div><p>Anecdote service not available due to problems in server</p></div>
  } else if (result.isLoading) {
    return <div><p>Loading data...</p></div>
  }
  const anecdotes = result.data

  return (
    <div>
      <NotificationContextProvider>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}
      </NotificationContextProvider>
    </div>
  )
}

export default App