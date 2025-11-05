// App.tsx
import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(#051029, #07112a)",
      color: "#fff",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{fontSize: 28, margin: 0}}>🔥 eSports Arena</h1>
        <p style={{opacity: 0.8, marginTop: 10}}>Demo build loaded — React is rendering.</p>
      </div>
    </div>
  );
}
