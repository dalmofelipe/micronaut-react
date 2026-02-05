import { createRoot } from 'react-dom/client'
import Router from '@/app/Router'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
)
