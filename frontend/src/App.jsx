import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CadastroPessoa from "./pages/CadastroPessoa/CadastroPessoa";
import ListarPessoas from "./pages/ListarPessoas/ListarPessoas";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          path="/cadastrar"
          element={isAuthenticated ? <CadastroPessoa /> : <Navigate to="/" />}
        />
        <Route
          path="/listar"
          element={isAuthenticated ? <ListarPessoas /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
