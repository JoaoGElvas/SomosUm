import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Certifique-se de que esse arquivo existe

const rootElement = document.getElementById("root");

console.log("Elemento root:", rootElement); // 🔍 Teste para ver se o elemento root existe

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Elemento #root não encontrado!");
}
