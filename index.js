const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('./db')


// Importe as rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

// Configuração do CORS para permitir uma origem específica
app.use(
  cors({
    origin: '*', // ou a origem real da sua aplicação
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use('/api', userRoutes);
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('Servidor ativo!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
