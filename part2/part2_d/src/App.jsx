import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchSubString, setSubString] = useState('')

  useEffect(() => {
  personService
  .getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubString = (event) => {
    const subString = event.target.value
    setSubString(subString)
  }

  const addInfo = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const isDublicateName = persons.some(person => person.name === personObject.name)
    const isDublicateNumber = persons.some(person => person.number === personObject.number)

    if (isDublicateName || isDublicateNumber){
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
    else {
      personService
      .create(personObject)
      .then((returnedPerson) => {
        const newPersonList = persons.concat(returnedPerson)
        setPersons(newPersonList)
        setNewName('')
        setNewNumber('')
      })
    } 
  }

  const searchedPersons = persons.filter(person => person.name.toLowerCase().includes(searchSubString.toLowerCase()))

  const deletePersonOf = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)){
      personService
      .deletePerson(id)
      .then((returnedPerson) => {
        const newPersonList = persons.filter(person => person.id !== returnedPerson.id)
        setPersons(newPersonList)
      })
      .catch((error) => {
        alert(error.message)
      })
    } else {
      console.log("no action will be taking")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchSubString} onChange={handleSubString}/>

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addInfo}
        nameValue={newName} nameOnChange={handleNameChange}
        numberValue={newNumber} numberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons 
        searchResults={searchedPersons} 
        deletePersonof={deletePersonOf}
      />
    </div>
  )
}

export default App