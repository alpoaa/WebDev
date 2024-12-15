const Weather = ({ weather }) => {
    if (Object.entries(weather).length === 0) {
        return null
    }

    return (
        <>
        <p>Temperature: {weather.current.temperature_2m} {weather.current_units.temperature_2m}</p>
        <p>Is day: {weather.current.is_day ? 'Yes' : 'No'}</p>
        <p>Raining: {weather.current.rain} {weather.current_units.rain}</p>
        <p>Snowing: {weather.current.snowfall} {weather.current_units.snowfall}</p>
        <p>Wind speed: {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}</p>
        </>
    )
}

export default Weather