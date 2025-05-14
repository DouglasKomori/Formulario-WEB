import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const produtos = []; // Armazenamento em memória

app.use(bodyParser.urlencoded({ extended: false }));

// Página de cadastro
app.get('/cadastro', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Cadastro de Produto</title>
      <style>
        * {
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
          background-color: #f4f6f9;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .container {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 500px;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #555;
          font-weight: bold;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
        }
        textarea {
          resize: vertical;
          min-height: 80px;
        }
        button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
        .footer {
          text-align: center;
          font-size: 13px;
          color: #999;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Cadastro de Produto</h1>
        <form action="/cadastro" method="POST">
          <label for="nome">Nome do Produto</label>
          <input type="text" name="nome" id="nome" required>

          <label for="preco">Preço (R$)</label>
          <input type="number" name="preco" id="preco" step="0.01" required>

          <label for="descricao">Descrição</label>
          <textarea name="descricao" id="descricao" required></textarea>

          <button type="submit">Cadastrar Produto</button>
        </form>
        <div class="footer">Douglas Komori 10442416198 © 2025</div>
      </div>
    </body>
    </html>
  `);
});

// Rota para processar cadastro
app.post('/cadastro', (req, res) => {
  const { nome, preco, descricao } = req.body;
  produtos.push({ nome, preco, descricao });

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Cadastro Concluído</title>
      <style>
        body {
          background-color: #f4f6f9;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .success-container {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        h1 {
          color: #28a745;
          margin-bottom: 20px;
        }
        p {
          color: #333;
          font-size: 16px;
          margin: 10px 0;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="success-container">
        <h1>Produto Cadastrado com Sucesso!</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Preço:</strong> R$ ${preco}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <a href="/cadastro">Cadastrar Outro Produto</a> |
        <a href="/produtos">Ver Produtos</a>
      </div>
    </body>
    </html>
  `);
});

// Página para ver todos os produtos
app.get('/produtos', (req, res) => {
  const lista = produtos.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${p.nome}</td>
      <td>R$ ${p.preco}</td>
      <td>${p.descricao}</td>
    </tr>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Lista de Produtos</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f6f9;
          padding: 40px;
        }
        h1 {
          text-align: center;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }
        th, td {
          padding: 12px 20px;
          border: 1px solid #ccc;
          text-align: left;
        }
        th {
          background-color: #007bff;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          text-decoration: none;
          background-color: #007bff;
          color: white;
          padding: 10px 15px;
          border-radius: 5px;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <h1>Produtos Cadastrados</h1>
      <table>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Descrição</th>
        </tr>
        ${lista}
      </table>
      <a href="/cadastro">Cadastrar Novo Produto</a>
    </body>
    </html>
  `);
});

app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <title>Sistema de Produtos</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #007bff, #00c6ff);
            color: white;
          }
          .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          }
          h1 {
            margin-bottom: 30px;
            font-size: 2.5em;
          }
          a.button {
            display: inline-block;
            background-color: white;
            color: #007bff;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 16px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          a.button:hover {
            background-color: #e6e6e6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Bem-vindo ao Sistema de Cadastro de Produtos</h1>
          <a class="button" href="/cadastro">Ir para o Cadastro</a>
        </div>
      </body>
      </html>
    `);
  });
  

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
