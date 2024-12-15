const Filter = ({ filter, filterChangeAction}) => {
    return (
      <div>
        filter shown with <input value={filter} onChange={filterChangeAction}/>
      </div>
    )
}
export default Filter