import Notes from "./components/Notes"
import NewNote from "./components/NewNote"
import Filter from "./components/Filter"

const App = () => {


  return(
    <div>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  )
}

export default App