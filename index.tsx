// index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

window.addEventListener("error", (e) => {
  console.error("Window error:", e.error || e.message);
  // show minimal debug
  document.body.innerHTML = `<pre style="color:red;">Error: ${e.message || e.error}</pre>`;
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rejection:", e.reason);
  document.body.innerHTML = `<pre style="color:orange;">Promise Rejection: ${JSON.stringify(e.reason)}</pre>`;
});

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  document.body.innerHTML = `<h1 style="color:#d33;">❌ Root div not found!</h1>`;
}
