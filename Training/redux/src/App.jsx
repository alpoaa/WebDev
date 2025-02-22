import { useEffect } from "react"
import Notes from "./components/Notes"
import NewNote from "./components/NewNote"
import Filter from "./components/Filter"
//import noteService from "./services/notes"
//import { setNotes } from "./reducers/noteReducer"
import { initiliazeNotes } from "./reducers/noteReducer"
import { useDispatch } from "react-redux"


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initiliazeNotes())
    /*
    noteService.getAll()
      .then(notes => dispatch(setNotes(notes)))
    */
  }, [dispatch])

  return(
    <div>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  )
}

export default App