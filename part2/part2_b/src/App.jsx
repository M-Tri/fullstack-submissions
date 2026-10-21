import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchSubString, setSubString] = useState('')

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
      <h2>Numberbook</h2>
      filter shown with <input
        value={searchSubString}
        onChange={handleSubString}>
      </input>
      <h2>add a new</h2>
      <form onSubmit={addInfo}>
        <div>name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <div>number: 
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchedPersons.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </div>
  )
}

export default App