const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: {
    origin: '*',
    methods: ['GET', 'POST'],
}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('server is running');
});

io.on('connection', (socket) => {
    socket.emit('me',socket.id);

    socket.on('disconnect', () =>{
        socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('callUser',{ signal: signalData, from, name }); 
    });
    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    });
});

server.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)
});