import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Firebase config import karo
// FIX: Corrected firebase import path
import './firebase';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);