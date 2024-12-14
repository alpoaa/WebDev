import { useState } from 'react'

const Header = ({ text }) => <><h3>{text}</h3></>
const Number = ({ person }) => <><p>{person.name} {person.number}</p></>
const Numbers = ({ persons, filter }) => {
  return (
    <>
    {persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Number key={person.name} person={person} />)}
    </>
  )
}

const AddNumber = ({ submitAction, nameChangeAction, newName, numberChangeAction, newNumber }) => {
  return (
    <>
    <form onSubmit={submitAction}>
      <div> name: <input value={newName} onChange={nameChangeAction}/></div>
      <div>number: <input value={newNumber} onChange={numberChangeAction}/></div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
    </>
  )
}

const Filter = ({ filter, filterChangeAction}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={filterChangeAction}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName]     = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter]       = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    
    let newNumberExists = persons.find(person => person.name === newName)

    if (newNumberExists) {
      window.alert(`${newName} is already added to phonebook`)
    } 
    else {
      const newNumberObj = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(newNumberObj))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange   = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <>
    <Header text='Phonebook' />
    <Filter filter={filter} filterChangeAction={handleFilterChange}/>
    <Header text='Add new' />
    <AddNumber 
      submitAction={addNumber} 
      nameChangeAction={handleNameChange} 
      newName={newName}
      numberChangeAction={handleNumberChange}
      newNumber={newNumber}
    />
    <Header text='Numbers' />
    <Numbers persons={persons} filter={filter}/>
    </>
  )
}

export default App
