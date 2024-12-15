const AddForm = ({ submitAction, nameChangeAction, newName, numberChangeAction, newNumber }) => {
    return (
      <>
      <form onSubmit={submitAction}>
        <div> name: <input value={newName} onChange={nameChangeAction}/></div>
        <div>number: <input value={newNumber} onChange={numberChangeAction}/></div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      </>
    )
}

export default AddForm