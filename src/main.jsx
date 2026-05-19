import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import App from './App'
import './index.css'
import './styles/auth.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

