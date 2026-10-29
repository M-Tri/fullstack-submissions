import Country from './Country'

const Countries = ({ matchingCountries }) => {
    const numberOfCountries = matchingCountries.length

    if (numberOfCountries > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (numberOfCountries === 1) {
        const countryMatched = matchingCountries[0]
        return (
           <Country countryMatched={countryMatched} />
        )
    }
    
    return (
    <ul>
        {matchingCountries.map((country) => (
        <li
            key={country.cca2}
            country={country}
            >
            {country.name.common}
        </li>
        ))}
    </ul>
    )
}

export default Countries