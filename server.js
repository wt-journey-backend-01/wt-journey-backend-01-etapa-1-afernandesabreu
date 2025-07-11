const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
  const {nome, ingredientes } = req.query
  return res.send(
    `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agradecemos sua sugestão</title>
      </head>
      <body>
        <h1>Sugestão recebida</h1>
        <p>Obrigado, ${nome}!</p>
        <p>Sua sugestão de ${ingredientes} foi salva com sucesso.</p>
        <a href="/">Voltar</a>
      </body>
    </html>
    `
  );
});

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});