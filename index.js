const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connectedUsers = new Map(); // Mapa para armazenar os usuários conectados

// Importe as rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

// Configuração do CORS para permitir uma origem específica
app.use(
  cors({
    origin: 'http://localhost:19006', // ou a origem real da sua aplicação
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

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('login', (name) => {
    connectedUsers.set(socket.id, name); // Associa o socket.id com o nome do usuário
  });

  socket.on('sendMessage', (data) => {
    const { sender, text } = data;

    // Emite a mensagem para todos os clientes conectados
    io.emit('message', { sender, text });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Remove o cliente desconectado do mapa
    connectedUsers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
