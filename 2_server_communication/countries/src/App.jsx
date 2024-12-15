import { useState, useEffect } from 'react'
import countryService from './services/service'

//component imports
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [data, setData]     = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
    .getAllCountries()
    .then(initialData => {
      setData(initialData)
    })
  }, [])

  const handleFilterValueChange = (event) => setFilter(event.target.value)

  return (
    <>
    <Filter value={filter} valueChangeAction={handleFilterValueChange}/>
    <Countries countries={data} filter={filter}/>
    </>
  )
}

export default App
