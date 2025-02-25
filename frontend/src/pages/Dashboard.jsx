import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove autenticação
    navigate("/"); // Redireciona para login
  };

  return (
    <div>
      <h2>Bem-vindo ao Dashboard!</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Dashboard;
