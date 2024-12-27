import { useState, useEffect } from 'react'
import axios from 'axios'

//api service
import personService from './services/persons'

//import components
import Header from './components/Header'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons]     = useState([])
  const [newName, setNewName]     = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter]       = useState('')
  const [message, setMessage]     = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
 }, [])

  const addNumber = (event) => {
    event.preventDefault()
    
    let newPerson = persons.find(person => person.name === newName)

    if (newPerson) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updateNumberObj = {
          ...newPerson,
          number: newNumber
        }

        personService
        .update(newPerson.id, updateNumberObj)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.name !== newPerson.name ? person : updatedPerson))
        })
        .catch(error => {
          if (error.response.data.error) {
            setNotification(error.response.data.error, 'error')
          } else {
            setNotification(`${newPerson.name} was already removed from server`, 'error')
            setPersons(persons.filter(person => person.name !== newPerson.name))
          }
        })
      }
    } 
    else {
      const newNumberObj = {
        name: newName,
        number: newNumber
      }
      
      personService
      .create(newNumberObj)
      .then(createdObj => {
        setPersons(persons.concat(createdObj))
        setNotification(`${createdObj.name} created!`, 'info')
      })
      .catch(error => {
        setNotification(error.response.data.error, 'error')
      })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange   = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleDeletePerson = id => {
    const personDelete = persons.find(person => person.id === id)

    if (personDelete) {
      if (window.confirm(`Delete ${personDelete.name} ?`)) {
        personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    } else {
      window.alert('The person who is about to be deleted does not exists')
    }

  }

  const setNotification = (notifMessage, notifType) => {
    setMessage(notifMessage)
    setMessageType(notifType)

    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 2000)
  }

  return (
    <>
    <Header text='Phonebook' />
    <Notification message={message} type={messageType} />
    <Filter filter={filter} filterChangeAction={handleFilterChange}/>
    <Header text='Add new' />
    <AddForm 
      submitAction={addNumber} 
      nameChangeAction={handleNameChange} 
      newName={newName}
      numberChangeAction={handleNumberChange}
      newNumber={newNumber}
    />
    <Header text='Numbers' />
    <Numbers persons={persons} filter={filter} deletePersonAction={handleDeletePerson} />
    </>
  )
}

export default App
