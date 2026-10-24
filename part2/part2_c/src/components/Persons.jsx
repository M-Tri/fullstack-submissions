const Persons = ({searchResults}) => {
  return (
    <div>
    {searchResults.map(person =>
      <li key={person.name}>{person.name} {person.number}</li>
    )}
  </div>
  )
}

export default Persons