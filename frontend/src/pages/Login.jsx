import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        nome,
        senha,
      });
      setMensagem(response.data.message);

      // Exibe a mensagem por um tempo antes de redirecionar
      setTimeout(() => {
        setIsAuthenticated(true);
        navigate("/dashboard");
      }, 1500); // 1,5 segundos
    } catch (error) {
      setMensagem("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        onKeyDown={handleKeyPress} // Detecta tecla pressionada
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        onKeyDown={handleKeyPress} // Detecta tecla pressionada
      />
      <button onClick={handleLogin}>Entrar</button>

      {/* Exibir mensagem de erro ou sucesso */}
      {mensagem && (
        <p
          className={`mensagem ${
            mensagem.includes("Erro") ? "erro" : "sucesso"
          }`}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default Login;
