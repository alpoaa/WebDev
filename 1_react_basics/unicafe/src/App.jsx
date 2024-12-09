import { useDeferredValue } from 'react'
import { useState } from 'react'

const Header = ({ text }) => <><h1>{text}</h1></> 
const Button = ({ clickAction, btnText }) => <><button onClick={clickAction}>{btnText}</button></>
const StatisticsLine = ({ text, value, char }) => <tr><td>{text}</td><td>{value}{char}</td></tr>
const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }

  const average = all / good - bad
  const positive = good / all * 100

  return (
    <table>
      <tbody>
        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Bad' value={bad} />
        <StatisticsLine text='All' value={all} />
        <StatisticsLine text='Average' value={average} />
        <StatisticsLine text='Positives' value={positive} char='%'/>
      </tbody>
    </table>
  )
}


const App = () => {
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)
  const [all, setAll]         = useState(0)

  const handleClickGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + bad + neutral)
  }
  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)
  }

  const handleClickBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + good + neutral)
  }

  return (
    <>
    <Header text='Give feedback' />
    <Button clickAction={handleClickGood} btnText='good' />
    <Button clickAction={handleClickNeutral} btnText='neutral' />
    <Button clickAction={handleClickBad} btnText='bad' />
    <Header text='Statistics' />
    <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </>
  )
}

export default App
