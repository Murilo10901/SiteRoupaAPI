import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// REGISTRO
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    const user = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    }

    res.json({ message: 'Login bem-sucedido!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// LISTAR TODOS OS USUÁRIOS
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// ATUALIZAR USUÁRIO
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await prisma.user.update({
      where: { id },
      data: { name, email }
    });
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// DELETAR USUÁRIO
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
});

// PÁGINA ADMIN
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// GET /users - retorna todos os usuários (para popular tabela)
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// PUT /users/:id - atualiza usuário
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email }
    });
    res.json(updatedUser);
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// DELETE /users/:id - deleta usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuário deletado' });
  } catch {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});
