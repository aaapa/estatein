import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createRoot, hydrateRoot } from 'react-dom/client'
import 'simplebar-core/dist/simplebar.css'
import 'tippy.js/dist/tippy.css'
import './styles/index.scss'
import { App } from './App'

const root = document.getElementById('root')
const application = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, application)
} else {
  createRoot(root).render(application)
}
