import React from 'react'
import App from './App.tsx'
import store from './store/index.ts'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
)
