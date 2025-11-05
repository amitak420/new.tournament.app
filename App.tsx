// App.tsx
import React from "react";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#05051a",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>🔥 eSports Arena Platform 🔥</h1>
      <p style={{ marginTop: 10, opacity: 0.8 }}>
        If you see this, React is rendering successfully.
      </p>
    </div>
  );
}
