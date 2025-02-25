import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true"; // Verifica se está autenticado

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
