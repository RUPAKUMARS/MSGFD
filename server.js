const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const ffmpeg = require('fluent-ffmpeg');
const static = require('node-static');

// Serve frontend files
app.use(express.static('public'));

// Create a static file server to serve audio files
const fileServer = new static.Server('./audio');

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle chat messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Audio streaming endpoint
app.get('/audio/:filename', (req, res) => {
    const filename = req.params.filename;
    const path = `./audio/${filename}`;

    // Check if file exists
    if (!fs.existsSync(path)) {
        res.status(404).send('File not found');
        return;
    }

    // Stream the audio file
    ffmpeg(path)
        .format('mp3')
        .pipe(res, { end: true });
});
