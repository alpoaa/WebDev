import CountryBasic from "./CountryBasic"
import CountryFull from "./CountryFull"

const Countries = ({ countries, filter }) => {
    if (countries === null) {
        return null
    }

    const filteredCountries = countries
        .filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    
    if (filteredCountries.length === 0) {
        return null
    } else if (filteredCountries.length > 10) {
        return (
            <>
            <p>Too many matches, specify another filter</p>
            </>
        )
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            <>
            {filteredCountries.map((country, idx) => 
                <CountryBasic key={idx} country={country} />
            )}
            </>
        )
    }

    return (
        <>
        {filteredCountries.map((country, idx) => 
            <CountryFull key={idx} country={country} />
        )}
        </>
    )
}

export default Countries