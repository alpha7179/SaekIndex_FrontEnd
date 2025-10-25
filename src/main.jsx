/* src/main.jsx */
import React, { Suspense } from 'react'; 
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './i18n';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {}
    <Suspense fallback="Loading..."> 
      <App />
    </Suspense>
  </React.StrictMode>,
);