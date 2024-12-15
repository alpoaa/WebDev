import { useState } from 'react'
import '../styles/countryFull.css'
import weatherService from '../services/service'

import Weather from './Weather'


const CountryFull = ({ country }) => {
    const [weather, setWeather] = useState({})
    const [showWeather, setShowWeather] = useState(false)
    const countryLanguages = Object.values(country.languages)

    const handleWeatherSearch = () => {
        setShowWeather(!showWeather)

        if (Object.entries(weather).length === 0) {
            weatherService
            .getCountryWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
            .then(capitalWeatherData => {
                setWeather(capitalWeatherData)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <>
        <h3>{country.name.common}</h3>
        <p>{`Capital: ${country.capital[0]}`}</p>
        <p>{`Area: ${country.area}`}</p>
        <p><strong>Languages:</strong></p>
        {countryLanguages.map((language, idx) => <li key={idx}>{language}</li>)}
        <div className='image'>
            <img src={country.flags.png} alt={country.flags.alt}/>
        </div>
        <div>
            <h4>{`Weather in capital: ${country.capital[0]}`}</h4>
            <button onClick={handleWeatherSearch}>{showWeather ? 'Hide weather' : 'Find capital weather'}</button>
            {showWeather ? <Weather weather={weather} /> : null}
        </div>
        </>
    )
}

export default CountryFull