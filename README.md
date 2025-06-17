# APISala

API RESTful desenvolvida com Node.js, Express e MongoDB, simulando um backend para gerenciamento de usuários, autores e postagens.

## Objetivo

Projeto criado para a disciplina de Arquitetura de Software, com foco na aplicação de conceitos como:

- Arquitetura em camadas  
- Princípios SOLID  
- Inversão de dependência (services → repositories)  
- Separação de responsabilidades  
- Uso de middlewares, DTOs e Swagger  

## Tecnologias

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- Swagger  
- Dotenv  
- Nodemon  

## Estrutura de Pastas

ProjetoAPSarqSoftware/
│
├── src/
│ ├── config/
│ ├── controllers/
│ ├── dtos/
│ ├── middleware/
│ ├── models/
│ ├── repositories/
│ ├── routes/
│ └── services/
│
├── app.js
├── server.js
├── package.json
└── README.md


## Instalação e Execução

**Pré-requisitos:**

- Node.js  
- MongoDB local ou Atlas  
- Postman ou Insomnia  

**Passos:**


git clone https://github.com/seu-usuario/ProjetoAPSarqSoftware.git
cd ProjetoAPSarqSoftware
npm install
touch .env
Exemplo de .env:


PORT=3000
MONGODB_URI=mongodb://localhost:27017/aps_database
JWT_SECRET=seusegredoaqui
Rodar o servidor:


npm run dev
A aplicação estará disponível em: http://localhost:3000

Endpoints Principais
Autenticação:

POST /auth/login

Usuários:

GET /users

POST /users

PUT /users/:id

DELETE /users/:id

Autores:

GET /authors

POST /authors

PUT /authors/:id

DELETE /authors/:id

Postagens:

GET /posts

POST /posts

PUT /posts/:id

DELETE /posts/:id

Documentação Swagger:
Disponível em http://localhost:3000/api-docs

Exemplos de DTOs
userDto.js

{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}
postDto.js

json
Copiar
Editar
{
  "title": "Meu primeiro post",
  "content": "Conteúdo do post...",
  "authorId": "65ab12cd34ef567..."
}
Middleware de Autenticação
As rotas protegidas usam authMiddleware.js para validar o token JWT enviado no header:

Authorization: Bearer <token>
Boas Práticas Aplicadas
Arquitetura em camadas

Uso de DTOs

Documentação com Swagger

Autenticação com JWT

Padrão Repository

Código modular e organizado
