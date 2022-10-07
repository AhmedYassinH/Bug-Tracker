import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ContextProvider } from './context/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContextProvider>

      
       <App />
      </ContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);

