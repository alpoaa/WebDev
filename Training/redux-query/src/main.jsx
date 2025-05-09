// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import { Provider } from 'react-redux'
import App from './App'

//import store from './store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  /*
  <Provider store={ store }>
    <App />
  </Provider>
  */

  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)