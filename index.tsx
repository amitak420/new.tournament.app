import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

window.addEventListener("error", (e) => {
  console.error("Window error:", e.error || e.message);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejection:", e.reason);
});

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  document.body.innerHTML = '<div style="padding:40px;color:#b00;font-size:20px;"><strong>✖ Root div not found!</strong></div>';
}
