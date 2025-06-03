📝 Explicação do Projeto – Sistema de Login com MongoDB e Prisma
🔧 Tecnologias Utilizadas
Node.js com Express.js para o servidor backend.

Prisma ORM para conectar e manipular o banco de dados MongoDB.

MongoDB como banco de dados.

HTML, CSS e JavaScript no frontend (localizados na pasta public/frontend).


project-root/
├── prisma/
│   └── schema.prisma   → define o modelo dos dados e conecta com o MongoDB
├── public/
│   └── frontend/
│       ├── register.html → tela de cadastro
│       ├── login.html    → tela de login
│       └── index.html    → página inicial
├── auth.js              → controla o login e registro
├── server.js            → servidor principal com Express
├── package.json         → dependências do projeto
└── .env                 → variáveis como URL do banco MongoDB



🧠 O que é o Prisma?
O Prisma é um ORM (Object-Relational Mapping) que facilita a comunicação entre o código JavaScript e o banco de dados (neste caso, o MongoDB).

✅ Para que serve?
Modelar as tabelas (ou coleções) de forma simples no arquivo schema.prisma.

Criar e buscar usuários de forma fácil com comandos como prisma.user.create() ou prisma.user.findUnique().

Substitui o uso direto de comandos MongoDB complicados.



Explicação dos Arquivos
📄 schema.prisma (em prisma/)
Define o modelo de dados.

Exemplo:

model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
  password String
}

Esse modelo cria a coleção User no MongoDB com os campos name, email e password.



auth.js (IMPORTANTE DEMAIS)
Contém a lógica de registro e login.

Usa o Prisma para salvar e buscar dados do MongoDB.

Principais funções:
registerUser(req, res): Cadastra o usuário se o email não estiver no banco.

loginUser(req, res): Verifica se o usuário existe e se a senha está correta.




 server.js
É o servidor principal da aplicação.

Usa o Express para:

Servir as páginas HTML (/login, /register, /).

Tratar as requisições de POST para login e registro.

Conecta com o arquivo auth.js para processar as ações.




public/frontend/
Contém todas as páginas do frontend:

✅ register.html
Formulário para o usuário preencher nome, email e senha e se cadastrar.

Envia os dados para o servidor via fetch('/register', { method: 'POST' }).

✅ login.html
Formulário para o usuário fazer login com email e senha.

Verifica os dados e redireciona para a página inicial se estiver tudo certo.

✅ index.html
Página inicial acessada após o login.




 Como funciona o fluxo completo
O usuário acessa /register, preenche os dados e clica em "Cadastrar".

O servidor salva no MongoDB via Prisma.

Depois, o usuário acessa /login e faz o login com os dados cadastrados.

Se o login estiver certo, ele é redirecionado para a página inicial (/).
