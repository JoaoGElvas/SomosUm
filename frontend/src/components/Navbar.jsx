import { Link } from "react-router-dom";
import "./Navbar.css"; // Importando os estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>SomosUm</h1>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
