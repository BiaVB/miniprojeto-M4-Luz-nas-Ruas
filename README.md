# Luz nas Ruas

Este projeto tem como objetivo divulgar ONGs que ajudam pessoas em situação vulneravel.
A aplicação conta com rotas de cadastro de usuário e verificação de conta por e-mail.


## Rotas

O projeto possui três rotas principais do tipo GET:
### 1. **GET /usuarios**
### 2. **GET /usuarios/:email**
### 3. **GET /usuarios-verificados**

**Exemplos de URL**:
   - `http://localhost:3000/usuarios`
   - `http://localhost:3000/usuarios/joao@gmail.com`
   - `http://localhost:3000/usuarios-verificados`


## Tecnologias Usadas
 **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript
- **Envio de E-mail**: Mailtrap (simulação de envio de e-mail)

  # Como Usar
1. Instale as dependências:
   npm install

 2.Inicie o servidor:
   node src/app.js

3.Acesse as rotas da API:
 http://localhost:3000/usuarios
 http://localhost:3000/usuarios/:email
 http://localhost:3000/usuarios-verificados

