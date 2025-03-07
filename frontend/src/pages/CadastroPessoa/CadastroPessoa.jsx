import { useState } from "react";
import "./CadastroPessoa.css";

const CadastroPessoa = () => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [localResidencia, setLocalResidencia] = useState("");
  const [estudando, setEstudando] = useState(false);
  const [mostrarEstudando, setMostrarEstudando] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleCadastro = () => {
    if (!nome || !idade || !localResidencia) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novaPessoa = { nome, idade, localResidencia, estudando, observacao };

    // Salva no localStorage para simular um banco de dados
    const pessoasSalvas = JSON.parse(localStorage.getItem("pessoas")) || [];
    pessoasSalvas.push(novaPessoa);
    localStorage.setItem("pessoas", JSON.stringify(pessoasSalvas));

    // Mensagem de sucesso e limpeza dos campos
    setMensagem("Pessoa cadastrada com sucesso!");
    setNome("");
    setIdade("");
    setLocalResidencia("");
    setEstudando(false);
    setMostrarEstudando(false);
    setObservacao("");

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Pessoa</h2>
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

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
        onChange={(e) => {
          setIdade(e.target.value);
          setMostrarEstudando(e.target.value < 18);
        }}
      />

      <input
        type="text"
        placeholder="Local de Residência"
        value={localResidencia}
        onChange={(e) => setLocalResidencia(e.target.value)}
      />

      {mostrarEstudando && (
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={estudando}
              onChange={(e) => setEstudando(e.target.checked)}
            />
            Está estudando?
          </label>
        </div>
      )}

      <textarea
        placeholder="Observação"
        value={observacao}
        onChange={(e) => setObservacao(e.target.value)}
      ></textarea>

      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
};

export default CadastroPessoa;
