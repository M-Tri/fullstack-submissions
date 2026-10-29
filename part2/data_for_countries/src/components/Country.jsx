import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'
import '../styles/Country.css'
import Weather from './Weather'

const Country = ({countryMatched}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      weatherService
      .getCapitalWeather(countryMatched.capital)
      .then((weather) => {
          setWeather(weather)
        })
      },[countryMatched])

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

            <h2>Weather in Helsinki</h2>
            <Weather weather={weather} />
        </div>
    )
}

export default Country