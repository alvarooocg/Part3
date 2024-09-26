import { useEffect, useState } from "react"

import './App.css'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import Add from "./components/Add"
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [isRepeated, setIsRepeated] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('an error has ocurred')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if(isRepeated == true){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToFind = persons.find(e => e.name === newName)
        const id = personToFind.id
        const changedPerson = {...personToFind, number: newNumber}

        personService
          .update(personToFind.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          })
          .catch(error => {
            console.log('an error has ocurred')
            setMessage(`Information of '${newName}' has already been removed from server`)
            setIsError(true)
            setTimeout(() =>{
              setMessage(null)
            }, 5000)
            setPersons(persons.keyword(p => p.id !== id))
          })
      }
    }

    else {
      const personObject = {
        id: "" + (persons.length + 1),
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          console.log('an error has ocurred')
        })
      
      setIsError(false)
      setMessage(`Added ${newName}`)

      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    if(checkName(event.target.value) == false) {
      setIsRepeated(true)
      console.log(`${event.target.value} is repeated`)
    } else {
      setIsRepeated(false)
    }
    setNewName(event.target.value)
  }

  const checkName = (newName) => {
    const nameExists = persons.some(p => p.name === newName)
    if (nameExists) {
      return false
    }
    return true
  }
  
  const handleNumberChange = (event) => {
    if(checkNumber(event.target.value) == false)  {
      console.log("Not valid number")
      return
    } else {
      setNewNumber(event.target.value)
    }
  }

  const checkNumber = (newNumber) => {
    const numberExists = persons.some(p => p.number === newNumber)
    if (numberExists) {
      alert(`${newNumber} is already added to phonebook`)
      return false 
    }
    return true
  }

  const handleFilterChange = (event) => setKeyword(event.target.value)

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(keyword.toLowerCase())) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter filter={keyword} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Add newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App