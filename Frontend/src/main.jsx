import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx' 
import StoreContextprovider from './Context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <StoreContextprovider >
        <App />
    </StoreContextprovider>
 </BrowserRouter>
)
