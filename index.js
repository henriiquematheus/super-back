const express = require('express');
const app = express();
const mongoose = require('./db'); // Importe sua configuração do banco de dados

// Importe as rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware para processar JSON
app.use(express.json());

// Rotas para usuários
app.use('/api', userRoutes);

// Rotas para produtos
app.use('/api', productRoutes);

// Rota padrão para verificar se o servidor está ativo
app.get('/', (req, res) => {
  res.send('Servidor ativo!');
});

// Porta em que o servidor será iniciado
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
