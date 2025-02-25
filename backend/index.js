require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(cors());

// Configuração do banco de dados com Pool (melhor prática)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Limita conexões simultâneas
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
  connection.release(); // Libera a conexão após verificar que está funcionando

  // Array com os comandos SQL para criar tabelas
  const tables = [
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      senha VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS pessoas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      sobrenome VARCHAR(100) NOT NULL,
      idade INT NOT NULL,
      residencia VARCHAR(255) NOT NULL,
      crianca BOOLEAN NOT NULL,
      estudando BOOLEAN NULL
    )`,
    `CREATE TABLE IF NOT EXISTS presencas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      pessoa_id INT NOT NULL,
      data_presenca DATE NOT NULL,
      FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE
    )`,
  ];

  tables.forEach((query) => {
    db.query(query, (err) => {
      if (err) console.error("Erro ao criar tabela:", err);
      else console.log("Tabela criada com sucesso!");
    });
  });
});

// Rotas
const authRoutes = express.Router();
authRoutes.post("/login", (req, res) => {
  const { nome, senha } = req.body;
  if (nome === "admin" && senha === "senha123") {
    return res.json({ message: "Login bem-sucedido", token: "fake-token" });
  }
  return res.status(401).json({ message: "Credenciais inválidas" });
});
app.use("/api/auth", authRoutes);

// Importa as rotas e passa a conexão do banco
const personRoutes = require("./src/routes/personRoutes")(db);
app.use("/api/people", personRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
