import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()

    return (
        <div>   
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))} value="All"/>
            <label htmlFor="All">All</label>
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))} value="Important"/>
            <label htmlFor="Important">Important</label>
            <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))} value="NonImportant"/>
            <label htmlFor="NonImportant">Nonimportant</label>
      </div>
    )
}

export default Filter