// index.tsx (temporary debug entry)
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<h1 style='color:red'>No root element found</h1>";
} else {
  try {
    createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Render error:", err);
    document.body.innerHTML = `<pre style="color:red">Render error: ${String(err)}</pre>`;
  }
}
