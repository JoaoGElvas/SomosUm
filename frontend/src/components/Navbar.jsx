import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove autenticação
    navigate("/"); // Redireciona para login
  };

  return (
    <nav className="navbar">
      <h1>SomosUm</h1>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/cadastrar">Cadastrar Pessoa</Link>
        </li>
        <li>
          <Link to="/listar">Ver Pessoas</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
