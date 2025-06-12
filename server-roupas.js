import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;  // nova porta só para roupas
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public', 'roupas')));

// Página de cadastro de roupa
app.get('/cadastro-roupa', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'roupas', 'cadastro.html'));
});

// Cadastrar peça de roupa
app.post('/roupas', async (req, res) => {
  const { peca, preco, estoque, cor } = req.body;
  try {
    const novaRoupa = await prisma.roupa.create({
      data: { peca, preco: parseFloat(preco), estoque: parseInt(estoque), cor },
    });
    res.status(201).json(novaRoupa);
  } catch {
    res.status(500).json({ error: 'Erro ao cadastrar peça de roupa.' });
  }
});

// Listar roupas
app.get('/roupas', async (req, res) => {
  const roupas = await prisma.roupa.findMany();
  res.json(roupas);
});

// Atualizar peça
app.put('/roupas/:id', async (req, res) => {
  const { id } = req.params;
  const { peca, preco, estoque, cor } = req.body;

  try {
    const roupaAtualizada = await prisma.roupa.update({
      where: { id },
      data: { peca, preco: parseFloat(preco), estoque: parseInt(estoque), cor },
    });
    res.json(roupaAtualizada);
  } catch {
    res.status(500).json({ error: 'Erro ao atualizar roupa.' });
  }
});

// Deletar
app.delete('/roupas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.roupa.delete({ where: { id } });
    res.json({ message: 'Roupa deletada com sucesso!' });
  } catch {
    res.status(500).json({ error: 'Erro ao deletar roupa.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de roupas rodando na porta ${port}`);
});


// logo após app.use(express.static(...));
app.get('/admin-roupas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'roupas', 'admin-roupas.html'));
});
