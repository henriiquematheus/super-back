io.on('connection', (socket) => {
    console.log('New client connected');
  
    // When a user logs in, associate the socket.id with the user's name
    socket.on('login', (name) => {
      socketMap.set(socket.id, name);
    });
  
    // When a message is received from a client
    socket.on('sendMessage', async (data) => {
      // data should include the sender's name and the message text
      const { sender, text } = data;
  
      // Get the sender's socket id
      const senderSocketId = [...socketMap.entries()]
        .find(([socketId, name]) => name === sender)[0];
  
      // Broadcast the message to all connected clients
      io.emit('message', {
        sender: socketMap.get(senderSocketId),
        text,
      });
    });
  
    // When a client disconnects
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Remove the disconnected client from the map
      socketMap.delete(socket.id);
    });
  });