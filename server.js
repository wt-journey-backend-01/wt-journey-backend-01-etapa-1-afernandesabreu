const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');
  return res.status(200).sendFile(filePath);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  if (!nome?.trim() || !email?.trim() || !assunto?.trim() || !mensagem?.trim()) {
    return res.status(400).sendFile(path.join(__dirname, 'public', '404.html'));
  }

  return res.status(200).send(
  `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Contato Recebido</title>
    </head>
    <body>
      <h1>Ficamos felizes com seu contato</h1>
      <p>Obrigado ${nome} por sua mensagem acerca do assunto <strong>${assunto}</strong></p>
      <p>Seu endereço de e-mail foi registrado com sucesso como <strong>${email}</strong></p>
      <h2>Mensagem recebida:</h2>
      <p>Esta foi a mensagem recebida em nossos servidores:</p>
      <blockquote>${mensagem}</blockquote>

      <p>Em breve alguém de nossa equipe irá entrar em contato com você por e-mail</p>

      <a href="/">Voltar para a página inicial</a>
    </body>
  </html>
  `)
});

app.get('/sugestao', (req, res) => {
  const {nome, ingredientes } = req.query
  return res.status(200).send(
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
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});