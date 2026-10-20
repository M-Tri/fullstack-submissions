import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: '39-44-5323523'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addInfo = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      phone: newPhone
    }
    const isDublicateName = persons.some(person => person.name === personObject.name)
    const isDublicatePhone = persons.some(person => person.phone === personObject.phone)

    if (isDublicateName || isDublicatePhone){
      alert(`${newName} or ${newPhone} is already added to phonebook`)
    }
    else {
      const newPersonList = persons.concat(personObject)
      setPersons(newPersonList)
    }
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addInfo}>
        <div>name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <div>number: 
            <input
              value={newPhone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <li key={person.name}>{person.name} {person.phone}</li>
      )}
    </div>
  )
}

export default App