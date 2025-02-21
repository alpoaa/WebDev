import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

/*
const reducers = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducers)
*/
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})
/*
store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <App />
  </Provider>
)