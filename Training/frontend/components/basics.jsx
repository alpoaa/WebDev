import { useState } from "react"
//destruction options:
/*
Refer to "name" & "age" straight:
const { name, age } = props

Refer to "name" & "age" straight from function parameter:
const Hello = ({ name, age }) => 
*/
const Hello = (props) => {
  const name = props.name
  const age = props.age

  //because one line, no need the "return"
  const bornYear = () => new Date().getFullYear() - age
  /*
  const bornYear = () => {
  return new Date().getFullYear() - age
  }
  */
  
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const Display = ({ counter }) => {
  return (
    <div>
      {counter}
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }
  /*
  could be defined straight to html element like (not recommended, unless simple):
  <button onClick={() => console.log('clicked')}>
        plus
      </button>
  */

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text='plus' />
      <Button handleClick={decreaseByOne} text='minus' />
      <Button handleClick={setToZero} text='zero' />
      <Hello name={"Testi"} age={10} />
    </div>
  )
}

export default App