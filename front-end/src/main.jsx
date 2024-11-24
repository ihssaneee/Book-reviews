import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './router.jsx'
import App from './App.jsx';
import { initializeCsrfProtection } from './api/axiosConfig.js';
import AuthProvider from './contexts/AuthContext.jsx';
import { GenresProvider } from './contexts/GenreContext.jsx'
initializeCsrfProtection();
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider >
       <GenresProvider>
          <RouterProvider router={router} />
        </GenresProvider>
      </AuthProvider>
   
  </StrictMode>,
)
