import './styles.css'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import AppV2 from './v2/AppV2.jsx'

// The light design is the main site. The original dark design lives at /home-v2.
const Classic = lazy(() => import('./App.jsx'))
const isClassic = window.location.pathname.replace(/\/$/, '') === '/home-v2'
if (isClassic) document.body.classList.remove('is-v2')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isClassic ? <Suspense fallback={null}><Classic /></Suspense> : <AppV2 />}
  </StrictMode>
)
