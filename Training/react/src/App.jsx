import axios from 'axios'
import { useState, useEffect } from 'react'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes]     = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)

  //By default effect hook will be performed after when the component has been rendered
  //When using 2nd parameter as empty array, it will be used only once (when getting the base data)
  useEffect(() => {
     console.log('effect')
     axios
     .get('http://localhost:3001/notes')
     .then(response => {
       const data = response.data
       console.log(data)
       setNotes(data)
     })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const newNoteObj = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1)
    }

    setNotes(notes.concat(newNoteObj))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note=> <Note key={note.id} note={note} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App