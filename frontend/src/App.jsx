import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CadastroPessoa from "./pages/CadastroPessoa/CadastroPessoa";
import Navbar from "./components/Navbar";

function App() {
  console.log("App está sendo renderizado!"); // 👀 Teste para ver se o App está rodando

  // Estado de autenticação baseado no localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  // Atualiza o localStorage quando o estado de autenticação muda
  useEffect(() => {
    localStorage.setItem("auth", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/cadastro"
          element={isAuthenticated ? <CadastroPessoa /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
