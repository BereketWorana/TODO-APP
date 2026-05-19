import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-right" toastOptions={{
      style: { 
        background: '#0f1319', 
        color: '#e0e7ff', 
        border: '1px solid rgba(167, 139, 250, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(167, 139, 250, 0.2)',
        backdropFilter: 'blur(10px)'
      },
      success: {
        iconTheme: {
          primary: '#06b6d4',
          secondary: '#0f1319',
        },
      },
      error: {
        iconTheme: {
          primary: '#f43f5e',
          secondary: '#0f1319',
        },
      },
    }} />
    <App />
  </StrictMode>
)

