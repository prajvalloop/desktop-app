import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'

import ForgotPassword from './components/global/ForgotPassword/index.tsx'
import { Toaster } from 'sonner'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk publishable key to the .env.local file')
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}> */}
    <HashRouter>
      
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<App />} />
      </Routes>
      <Toaster/>
    </HashRouter>
    
    {/* </ClerkProvider> */}
    
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
