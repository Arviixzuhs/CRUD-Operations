import App from './App.tsx'
import React from 'react'
import store from './store/index.ts'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
)
