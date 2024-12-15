import { useState } from 'react'
import CountryFull from './CountryFull'

const CountryBasic = ({ country }) => {
    const [showFull, setShowFull] = useState(false)

    const handleShowFull = () => setShowFull(!showFull)

    return (
        <>
        <p>{country.name.common}</p>
        <button onClick={handleShowFull}>{showFull ? 'Hide' : 'Show all'}</button>
        {showFull ? <CountryFull country={country} /> : null}
        </>
    )
}

export default CountryBasic