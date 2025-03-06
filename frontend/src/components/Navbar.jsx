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
        {!localStorage.getItem("auth") && (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/cadastro">Cadastrar Pessoa</Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
