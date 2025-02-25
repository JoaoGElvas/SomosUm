const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Rota para listar pessoas
  router.get("/", (req, res) => {
    db.query("SELECT * FROM pessoas", (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar pessoas" });
      }
      res.json(results);
    });
  });

  // ✅ Rota para cadastrar uma pessoa
  router.post("/", (req, res) => {
    const { nome, sobrenome, idade, residencia, crianca, estudando } = req.body;

    if (!nome || !sobrenome || !idade || !residencia || crianca === undefined) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const sql = `INSERT INTO pessoas (nome, sobrenome, idade, residencia, crianca, estudando) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [nome, sobrenome, idade, residencia, crianca, estudando];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao cadastrar pessoa" });
      }
      res.status(201).json({
        message: "Pessoa cadastrada com sucesso",
        id: result.insertId,
      });
    });
  });

  return router;
};
