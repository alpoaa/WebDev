import Header from './components/Header'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <Header text='Anecdotes' />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App