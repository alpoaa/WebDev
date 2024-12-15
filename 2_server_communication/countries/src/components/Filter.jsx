const Filter = ({ value, valueChangeAction }) => {
    return (
        <>
        <p>Find countries</p>
        <input value={value} onChange={valueChangeAction} />
        </>
    )
}

export default Filter