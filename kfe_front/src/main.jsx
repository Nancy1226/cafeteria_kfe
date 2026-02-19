import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/containers/App'
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
  </StrictMode>,
)
