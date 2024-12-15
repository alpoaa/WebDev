import axios from 'axios'

const countriesBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?'

const getAllCountries = () => {
    const req = axios.get(countriesBaseUrl)
    return req.then(response => response.data)
}

const getCountryWeather = (latitude, longitude) => {
    const req = axios.get(`${weatherApiUrl}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,snowfall,wind_speed_10m&forecast_days=1`)
    return req.then(response => response.data)
}

export default {
    getAllCountries,
    getCountryWeather
}