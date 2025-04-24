const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');  // Importando o pacote cors
const app = express()

app.use(cors());  // Habilitando CORS para todas as origens
app.use(express.json());

const usuarios = [];

function gerarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// nodemailer
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '171b3c9d9f8b63',  // O usuário fornecido pelo Mailtrap
      pass: 'd160ca9764459f'   // A senha fornecida pelo Mailtrap
    }
});

function enviarEmail(destinatario, codigo) {
  const mailOptions = {
    from: 'luccidark25@gmail.com',
    to: destinatario,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${codigo}`
  };

  transporter.sendMail(mailOptions, (erro, info) => {
    if (erro) {
      console.error('Erro no envio', erro)
    } else {
      console.log('Email enviado', info.response)
    }
  });
}

// Cadastro de usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const codigo = gerarCodigo();

  const usuario = {
    id: usuarios.length + 1,
    nome,
    email,
    verificado: false,
    codigoVerificacao: codigo
  };
  usuarios.push(usuario);
  enviarEmail(email, codigo);
  res.status(201).json({ mensagem: 'Usuário cadastrado' });
});

// verificação 
app.post('/verificar', (req, res) => {
  const { email, codigo } = req.body;

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
  }
  if (usuario.codigoVerificacao === codigo) {
    usuario.verificado = true;
    return res.json({ mensagem: 'Usuário verificado.' });
  } else {
    return res.status(400).json({ mensagem: 'Código incorreto.' });
  }
});

// GET 1 - lista todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// GET 2 - busca um usuário por e-mail
app.get('/usuarios/:email', (req, res) => {
  const { email } = req.params;  // Corrigi aqui para extrair corretamente o email
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
  res.json(usuario);
});

// GET 3 - lista os usuários verificados
app.get('/usuarios-verificados', (req, res) => {
  const verificados = usuarios.filter(u => u.verificado);
  res.json(verificados);
});

app.use(express.static('front'));  // adicionei agr

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});

// POST - VERIFICAR CODIGO
app.post('/verificar', (req, res) => {
    const { email, codigo } = req.body;
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    if (usuario.codigoVerificacao === codigo) {
        usuario.verificado = true;
        return res.json({ mensagem: 'Usuário verificado com sucesso!' });
    } else {
        return res.status(400).json({ mensagem: 'Código incorreto.' });
    }
});