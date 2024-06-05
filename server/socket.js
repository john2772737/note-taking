const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios'); 
// Create an HTTP server
const socketServer = http.createServer();

// Initialize Socket.IO
const io = new Server(socketServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

// Socket.IO connection
io.on("connection", socket => {
  console.log("New client connected");
  socket.on("userConnected", useruid => {
    console.log('asd' + useruid);
    // Broadcast the user ID to all connected clients including the sender
    io.emit("receive", useruid);
  });
  socket.on("get-document", async documentId => {
    console.log(documentId)
    document= await axios.get(`http://localhost:3000/user/getDocumentData/${documentId}`)
    
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      
      await axios.put(`http://localhost:3000/user/updateDocumentData/${documentId}`,{data})
    })
  })
})

// Start the Socket.IO server on port 3001
socketServer.listen(3001, () => {
  console.log('Socket.IO server listening on port 3001');
});
