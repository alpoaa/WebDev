/* eslint-disable no-unused-vars */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../services/requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'Too short anecdote, must have length 5 or more'})
    },
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SHOW', payload: `Added anecdote: ${anecdote.content}` })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    newAnecdoteMutation.mutate({ content, votes: 0 })
    
  }
  
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm