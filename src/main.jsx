import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/QrCode.css'
import { QrCode } from './components/QrCode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <QrCode/>
  </StrictMode>,
)
