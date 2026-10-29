import { useState, useEffect } from 'react'
import countriesService from './services/countriesService.js'
import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearchValue, setCountrySearchValue] = useState('')
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
  countriesService
  .getAll()
  .then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  const handleMatchingCountries = (event) => {
    const currentSearch = event.target.value 
    setCountrySearchValue(currentSearch)
    const matchingCountries = countries.filter(country => country.name.common.toLowerCase().includes(currentSearch.toLowerCase()))
    setMatchingCountries(matchingCountries)
  }

  return (
    <div>
      
      <Search value={countrySearchValue} onChange={handleMatchingCountries} />

      <Countries matchingCountries={matchingCountries} />

    </div>
  )
}

export default App