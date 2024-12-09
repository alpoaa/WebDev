import { useState } from 'react'

const Header = ({ text }) => <><h1>{text}</h1></>
const Button = ({ clickAction, text }) => <button onClick={clickAction}>{text}</button>

const Anecdote = ({ anecdote, anecdoteVotes }) => {
  return (
    <>
    <p>{anecdote}</p>
    <p>has {anecdoteVotes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected]   = useState(0)
  const [votes, setVotes]         = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleClickNextAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleClickVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
    setMostVoted(copyVotes.indexOf(Math.max(...copyVotes)))
  }

  return (
    <>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} anecdoteVotes={votes[selected]} />
      <Button clickAction={handleClickVote} text='vote' />
      <Button clickAction={handleClickNextAnecdote} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdote anecdote={anecdotes[mostVoted]} anecdoteVotes={votes[mostVoted]} />
    </>

  )
}

export default App