const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // Adicione sua senha do MySQL aqui
  database: "somosum",
});

db.getConnection((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conectado ao banco de dados MySQL");
  }
});

const tables = [
  `CREATE TABLE IF NOT EXISTS pessoas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      cpf VARCHAR(11) UNIQUE NOT NULL,
      rg VARCHAR(20) NOT NULL,
      estado_civil VARCHAR(20) NOT NULL,
      conjuge VARCHAR(100) DEFAULT NULL,
      endereco VARCHAR(255) NOT NULL,
      mora_no_morro BOOLEAN NOT NULL,
      data_nascimento DATE NOT NULL,
      telefone VARCHAR(20) NOT NULL,
      qtd_pessoas_residencia INT NOT NULL,
      tem_filhos BOOLEAN NOT NULL,
      qtd_filhos INT DEFAULT NULL,
      recebe_auxilio BOOLEAN NOT NULL,
      recebe_vale_gas BOOLEAN NOT NULL,
      recebe_outro_beneficio BOOLEAN NOT NULL,
      outro_beneficio VARCHAR(255) DEFAULT NULL,
      observacoes TEXT,
      status ENUM('Ativo', 'Inativo') NOT NULL DEFAULT 'Ativo'
  )`,
  `CREATE TABLE IF NOT EXISTS filhos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      pessoa_id INT NOT NULL,
      nome VARCHAR(100) NOT NULL,
      sexo ENUM('Menino', 'Menina') NOT NULL,
      data_nascimento DATE NOT NULL,
      estudando BOOLEAN DEFAULT NULL,
      FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE
  )`,
];

tables.forEach((query) => {
  db.query(query, (err) => {
    if (err) console.error("Erro ao criar tabela:", err);
    else console.log("Tabela criada/verificada com sucesso!");
  });
});

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
  ) {
    idade--;
  }

  return idade;
}

app.get("/api/people", (req, res) => {
  db.query("SELECT * FROM pessoas", (err, results) => {
    if (err) {
      console.error("Erro ao buscar pessoas:", err);
      return res.status(500).json({ error: "Erro ao buscar dados" });
    }

    const pessoasComIdade = results.map((pessoa) => ({
      ...pessoa,
      idade: calcularIdade(pessoa.data_nascimento),
    }));

    res.json(pessoasComIdade);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/api/login", (req, res) => {
  const { nome, senha } = req.body;

  const validUser = "admin";
  const validPassword = "123456"; // Ajuste conforme necessário

  if (nome === validUser && senha === validPassword) {
    res.json({ success: true, message: "Login bem-sucedido!" });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});
