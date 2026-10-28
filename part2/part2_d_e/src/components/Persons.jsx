const Persons = ({searchResults, deletePersonof}) => {
  return (
    <div>
      {searchResults.map(person =>
        <li key={person.name}>{person.name} {person.number}
        <button onClick={() => deletePersonof(person.id)}>delete</button>
        </li>
      )}
    </div>
  )
}

export default Persons