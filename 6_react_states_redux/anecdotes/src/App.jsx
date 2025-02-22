import Notification from './components/Notification'
import Header from './components/Header'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

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