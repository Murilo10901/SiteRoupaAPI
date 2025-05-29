import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const express = require('express');

const path = require('path');
const port = 3000;

// Para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
