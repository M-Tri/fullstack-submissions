import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchSubString, setSubString] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    const dublicatePerson = persons.find(person => person.name === personObject.name)
    if (dublicatePerson) {
      if (window.confirm(`${dublicatePerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .updateNumber(dublicatePerson.id, personObject)
        .then((updatedPerson) => {
          const newPersonsList = persons.filter((p) => p.id !== dublicatePerson.id)
          setPersons(newPersonsList.concat(updatedPerson))
          setNewName('')
          setNewNumber('')
          return updatedPerson
        })
        .then((updatedPerson) => {
          setSuccessMessage(
            `Updated ${updatedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 4000)
        })
        .catch((error) => {
          console.log('delete failed:', error)
          setErrorMessage(
          `Information of '${dublicatePerson.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter((p) => p.name !== dublicatePerson.name))
        })
      }
    } else {
      personService
      .create(personObject)
      .then((addedPerson) => {
        const newPersonList = persons.concat(addedPerson)
        setPersons(newPersonList)
        setNewName('')
        setNewNumber('')
        return addedPerson
      })
      .then((updatedPerson) => {
          setSuccessMessage(
            `Added ${updatedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 4000)
      })
    } 
  }

  const searchedPersons = persons.filter(person => person.name.toLowerCase().includes(searchSubString.toLowerCase()))

  const deletePersonOf = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)){
      personService
      .deletePerson(id)
      .then(() => {
        const newPersonList = persons.filter(person => person.id !== id)
        setPersons(newPersonList)
      })
      .catch((error) => {
          setErrorMessage(
          console.log('delete failed:', error)
          `Information of '${personToDelete.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter((p) => p.id !== id))
        })
    } else {
      console.log("Person is not in the server")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={searchSubString} onChange={handleSubString} />

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