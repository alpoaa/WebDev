const Number = ({ person, deletePersonAction }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => deletePersonAction(person.id)}>delete</button>
    </>
  )
}

const Numbers = ({ persons, filter, deletePersonAction }) => {
  return (
    <>
    {persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => <Number key={person.id} person={person} deletePersonAction={deletePersonAction}/>)}
    </>
  )
}

export default Numbers
