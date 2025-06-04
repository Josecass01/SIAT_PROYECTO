import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';   // <- Esta línea es esencial para cargar Tailwind
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);