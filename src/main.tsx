import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './contexts/ThemeContext';
import {UserProvider} from './contexts/UserContext';
import router from './Router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
      <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
