import { useState } from "react";
import axios from "axios";
import "./CadastroPessoa.css";

const CadastroPessoa = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    estadoCivil: "Solteiro",
    conjuge: "",
    endereco: "",
    moraNoMorro: false,
    dataNascimento: "",
    telefone: "",
    qtdPessoasResidencia: "",
    temFilhos: false,
    filhos: [],
    recebeAuxilio: false,
    recebeValeGas: false,
    recebeOutroBeneficio: false,
    outroBeneficio: "",
    observacoes: "",
    status: "Ativo",
  });
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCadastro = async () => {
    try {
      await axios.post("http://localhost:5001/pessoas", formData);
      setMensagem("Pessoa cadastrada com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
      setFormData({
        nome: "",
        cpf: "",
        rg: "",
        estadoCivil: "Solteiro",
        conjuge: "",
        endereco: "",
        moraNoMorro: false,
        dataNascimento: "",
        telefone: "",
        qtdPessoasResidencia: "",
        temFilhos: false,
        filhos: [],
        recebeAuxilio: false,
        recebeValeGas: false,
        recebeOutroBeneficio: false,
        outroBeneficio: "",
        observacoes: "",
        status: "Ativo",
      });
    } catch (error) {
      alert(
        "Erro ao cadastrar: " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Pessoa</h2>
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="rg"
        placeholder="RG"
        value={formData.rg}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="endereco"
        placeholder="Endereço"
        value={formData.endereco}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dataNascimento"
        value={formData.dataNascimento}
        onChange={handleChange}
        required
      />

      <label>
        Estado Civil:
        <select
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleChange}
        >
          <option value="Solteiro">Solteiro</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viúvo">Viúvo</option>
        </select>
      </label>

      {formData.estadoCivil === "Casado" && (
        <input
          type="text"
          name="conjuge"
          placeholder="Nome do Cônjuge"
          value={formData.conjuge}
          onChange={handleChange}
        />
      )}

      <label>
        <input
          type="checkbox"
          name="temFilhos"
          checked={formData.temFilhos}
          onChange={handleChange}
        />
        Tem filhos?
      </label>

      <label>
        <input
          type="checkbox"
          name="recebeAuxilio"
          checked={formData.recebeAuxilio}
          onChange={handleChange}
        />
        Recebe Auxílio Brasil?
      </label>

      <label>
        <input
          type="checkbox"
          name="recebeValeGas"
          checked={formData.recebeValeGas}
          onChange={handleChange}
        />
        Recebe Vale Gás?
      </label>

      <label>
        <input
          type="checkbox"
          name="recebeOutroBeneficio"
          checked={formData.recebeOutroBeneficio}
          onChange={handleChange}
        />
        Recebe outro benefício?
      </label>

      {formData.recebeOutroBeneficio && (
        <input
          type="text"
          name="outroBeneficio"
          placeholder="Qual benefício?"
          value={formData.outroBeneficio}
          onChange={handleChange}
        />
      )}

      <textarea
        name="observacoes"
        placeholder="Observações"
        value={formData.observacoes}
        onChange={handleChange}
      ></textarea>

      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
};

export default CadastroPessoa;
