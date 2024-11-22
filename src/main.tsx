import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import App from './App'
import './css/index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
