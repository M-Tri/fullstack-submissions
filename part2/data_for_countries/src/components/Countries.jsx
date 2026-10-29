import Country from './Country'
import '../styles/countries.css'

const Countries = ({ matchingCountries, setMatchingCountries }) => {
    const numberOfCountries = matchingCountries.length
    const showCountry = (country) => {
        setMatchingCountries([country])
    }

    if (numberOfCountries > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } 
    else if (numberOfCountries === 1) {
        const countryMatched = matchingCountries[0]
        return (
           <Country countryMatched={countryMatched} />
        )
    }
    // less than 10 except 1
    else {
        return (
            <ul>
                {matchingCountries.map((country) => (
                <li className="search-row"
                    key={country.cca2}
                    country={country}
                    >
                    {country.name.common}
                    <button onClick={() => showCountry(country)}>Show</button>
                </li>
                ))}
            </ul>
            )
    }
}

export default Countries