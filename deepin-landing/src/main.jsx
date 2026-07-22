import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'        // agora em src/
import App from './App.jsx' // agora em src/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)