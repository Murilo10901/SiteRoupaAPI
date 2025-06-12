import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 4000;  // pode ser outra porta
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota para cadastro de funcionário
app.post('/funcionarios/register', async (req, res) => {
  const { name, email, cargo, password } = req.body;
  try {
    const existing = await prisma.funcionario.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'E-mail já cadastrado!' });
    }
    const funcionario = await prisma.funcionario.create({
      data: { name, email, cargo, password },
    });
    res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

// Listar funcionários
app.get('/funcionarios', async (req, res) => {
  try {
    const funcionarios = await prisma.funcionario.findMany();
    res.json(funcionarios);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar funcionários.' });
  }
});

// Atualizar funcionário
app.put('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, cargo } = req.body;
  try {
    const updated = await prisma.funcionario.update({
      where: { id },
      data: { name, email, cargo },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar funcionário.' });
  }
});

// Deletar funcionário
app.delete('/funcionarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.funcionario.delete({ where: { id } });
    res.json({ message: 'Funcionário deletado com sucesso!' });
  } catch {
    res.status(500).json({ error: 'Erro ao deletar funcionário.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Funcionarios rodando na porta ${port}`);
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve arquivos estáticos da pasta public/funcionarios
app.use(express.static(path.join(__dirname, 'public', 'funcionarios')));

// Rota para abrir a página de cadastro de funcionário
app.get('/funcionarios/register-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'funcionarios', 'register-funcionario.html'));
});
