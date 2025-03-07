import { useEffect, useState } from "react";
import "./ListarPessoas.css";

const ListarPessoas = () => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    const pessoasSalvas = JSON.parse(localStorage.getItem("pessoas")) || [];
    setPessoas(pessoasSalvas);
  }, []);

  return (
    <div className="listar-container">
      <h2>Lista de Pessoas</h2>
      {pessoas.length === 0 ? (
        <p>Nenhuma pessoa cadastrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Local de Residência</th>
              <th>Está Estudando?</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa, index) => (
              <tr key={index}>
                <td>{pessoa.nome}</td>
                <td>{pessoa.idade}</td>
                <td>{pessoa.localResidencia}</td>
                <td>
                  {pessoa.idade < 18 ? (pessoa.estudando ? "Sim" : "Não") : "-"}
                </td>
                <td>{pessoa.observacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarPessoas;
