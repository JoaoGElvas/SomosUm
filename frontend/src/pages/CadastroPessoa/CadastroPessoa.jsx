import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroPessoa = () => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [local, setLocal] = useState("");
  const [estudando, setEstudando] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleCadastro = async () => {
    try {
      await axios.post("http://localhost:5001/api/pessoas", {
        nome,
        idade,
        local,
        estudando,
        observacao,
      });

      setMensagem("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 2000); // Redireciona após 2s
    } catch (error) {
      setMensagem("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Pessoa</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <input
        type="text"
        placeholder="Local de Residência"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={estudando}
          onChange={(e) => setEstudando(e.target.checked)}
        />
        Está estudando?
      </label>
      <textarea
        placeholder="Observação"
        value={observacao}
        onChange={(e) => setObservacao(e.target.value)}
      />
      <button onClick={handleCadastro}>Cadastrar</button>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default CadastroPessoa;
