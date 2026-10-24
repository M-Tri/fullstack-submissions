import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchSubString, setSubString] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
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
      const newPersonList = persons.concat(personObject)
      setPersons(newPersonList)
    }
    setNewName('')
    setNewNumber('')
  }

  const searchedPersons = persons.filter(person => person.name.toLowerCase().includes(searchSubString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchSubString} onChange={handleSubString}></Filter>

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addInfo}
        nameValue={newName} nameOnChange={handleNameChange}
        numberValue={newNumber} numberOnChange={handleNumberChange}>
      </PersonForm>

      <h3>Numbers</h3>

      <Persons searchResults={searchedPersons} ></Persons>
    </div>
  )
}

export default App