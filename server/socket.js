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

  socket.on("get-document", async documentId => {
  
    document= await axios.get(`http://localhost:3001/user/getDocumentData/${documentId}`)
    console.log(document)
    socket.join(documentId)
    socket.emit("load-document", document)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      ''
    })
  })
})

// Start the Socket.IO server on port 3001
socketServer.listen(3001, () => {
  console.log('Socket.IO server listening on port 3001');
});
