import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
//import App from './App.jsx'

import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {

  const handleClickGood = () => store.dispatch({ type: 'GOOD' })
  const handleClickOk = () => store.dispatch({ type: 'OK' })
  const handleClickBad = () => store.dispatch({ type: 'BAD' })
  const handleClickReset = () => store.dispatch({ type: 'ZERO' })

  return (
    <>
      <div>
        <button onClick={handleClickGood}>good</button>
        <button onClick={handleClickOk}>ok</button>
        <button onClick={handleClickBad}>bad</button>
        <button onClick={handleClickReset}>reset</button>
      </div>
      <div>
        <p>Good: {store.getState().good}</p>
        <p>Ok: {store.getState().ok}</p>
        <p>Bad: {store.getState().bad}</p>
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)