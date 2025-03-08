const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Rota para listar todas as pessoas
  router.get("/", (req, res) => {
    db.query("SELECT * FROM pessoas", (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar pessoas" });
      }
      res.json(results);
    });
  });

  // Rota para cadastrar uma pessoa
  router.post("/", (req, res) => {
    const {
      nome,
      cpf,
      rg,
      estado_civil,
      conjuge,
      endereco,
      mora_no_morro,
      data_nascimento,
      telefone,
      moradores,
      tem_filhos,
      num_filhos,
      bolsa_familia,
      vale_gas,
      outro_beneficio,
      descricao_beneficio,
      observacoes,
      status,
      filhos,
    } = req.body;

    if (
      !nome ||
      !cpf ||
      !rg ||
      !estado_civil ||
      !endereco ||
      mora_no_morro === undefined ||
      !data_nascimento ||
      !telefone ||
      !moradores ||
      tem_filhos === undefined ||
      bolsa_familia === undefined ||
      vale_gas === undefined ||
      outro_beneficio === undefined ||
      !status
    ) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // Verifica se o CPF já existe
    db.query("SELECT id FROM pessoas WHERE cpf = ?", [cpf], (err, results) => {
      if (err) return res.status(500).json({ error: "Erro ao verificar CPF" });
      if (results.length > 0) {
        return res.status(400).json({ error: "Pessoa já cadastrada" });
      }

      // Insere a nova pessoa no banco
      const sql = `INSERT INTO pessoas (nome, cpf, rg, estado_civil, conjuge, endereco, mora_no_morro, 
                  data_nascimento, telefone, moradores, tem_filhos, num_filhos, bolsa_familia, 
                  vale_gas, outro_beneficio, descricao_beneficio, observacoes, status) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        nome,
        cpf,
        rg,
        estado_civil,
        conjuge,
        endereco,
        mora_no_morro,
        data_nascimento,
        telefone,
        moradores,
        tem_filhos,
        num_filhos,
        bolsa_familia,
        vale_gas,
        outro_beneficio,
        descricao_beneficio,
        observacoes,
        status,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Erro ao cadastrar pessoa" });
        }

        const pessoaId = result.insertId;

        // Se a pessoa tiver filhos, cadastrar cada um
        if (tem_filhos && filhos && filhos.length > 0) {
          const filhosValues = filhos.map((filho) => [
            pessoaId,
            filho.nome,
            filho.sexo,
            filho.data_nascimento,
            filho.estudando,
          ]);
          const filhosSql =
            "INSERT INTO filhos (pessoa_id, nome, sexo, data_nascimento, estudando) VALUES ?";

          db.query(filhosSql, [filhosValues], (err) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Erro ao cadastrar filhos" });
            }
          });
        }

        res
          .status(201)
          .json({ message: "Pessoa cadastrada com sucesso", id: pessoaId });
      });
    });
  });

  return router;
};
