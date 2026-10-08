import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const AppV2 = lazy(() => import('./v2/AppV2.jsx'))
const isV2 = window.location.pathname.replace(/\/$/, '') === '/home-v2'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isV2 ? <Suspense fallback={null}><AppV2 /></Suspense> : <App />}
  </StrictMode>
)
