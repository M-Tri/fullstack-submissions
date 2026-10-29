import '../styles/Country.css'

const Country = ({countryMatched}) => {
    return (
        <div>
            <h1>{countryMatched.name.common}</h1>
            <div>
                Capital {countryMatched.capital}
            </div>
            <div>
                Area {countryMatched.area}
            </div>
            <h2>Languages</h2>
            <ul>
                {Object.entries(countryMatched.languages).map(([key, name]) => (
                    <li key={key}>
                        {name}
                    </li>
                ))}
            </ul>
            <img className="flag-image" src={countryMatched.flags.svg}></img>
        </div>
    )
}

export default Country