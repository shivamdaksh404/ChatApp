// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// app.use(cors());

// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//     },

// })

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id} ${socket}`);


//     socket.on("join_room", (formData) => {
//         socket.join(formData.secretKey);
//         console.log(`User with ID: ${socket.id} joined room: ${formData.secretKey}`)
//     });


//     socket.on("send_message", (MsgData) => {
//         socket.to(MsgData.secretKey).emit("receive_message", MsgData)
//         console.log("this is msg data", MsgData)
//     })


//     socket.on("disconnect", () => {
//         console.log("user  this Disconnect Using with this id", socket.id)
//     });

// })

// server.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })






// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//     },
// });

// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);

//     socket.on("join_room", (formData) => {
//         socket.join(formData.secretKey);
//         console.log(`User with ID: ${socket.id} joined room: ${formData.secretKey}`);
//         socket.username = formData.username; // Store username in socket object
//         io.emit("user_connected", { id: socket.id, username: formData.username, message: `${formData.username} has connected` });
//     });

//     socket.on("send_message", (MsgData) => {
//         socket.to(MsgData.secretKey).emit("receive_message", MsgData);
//         console.log("This is msg data", MsgData);
//     });

//     socket.on("logout", () => {
//         io.emit("user_disconnected", { id: socket.id, username: socket.username, message: `${socket.username} has disconnected` });
//         console.log("User disconnected: ", socket.id);
//     });

//     socket.on("disconnect", () => {
//         io.emit("user_disconnected", { id: socket.id, username: socket.username, message: `${socket.username} has disconnected` });
//         console.log("User disconnected: ", socket.id);
//     });
// });

// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });





const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist'

// Set up Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust as needed
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('join_room', (formData) => {
        socket.join(formData.secretKey);
        console.log(`User with ID: ${socket.id} joined room: ${formData.secretKey}`);
        socket.username = formData.username; // Store username in socket object
        io.emit('user_connected', { id: socket.id, username: formData.username, message: `${formData.username} has connected` });
    });

    socket.on('send_message', (MsgData) => {
        socket.to(MsgData.secretKey).emit('receive_message', MsgData);
        console.log("This is msg data", MsgData);
    });

    socket.on('logout', () => {
        io.emit('user_disconnected', { id: socket.id, username: socket.username, message: `${socket.username} has disconnected` });
        console.log("User disconnected: ", socket.id);
    });

    socket.on('disconnect', () => {
        io.emit('user_disconnected', { id: socket.id, username: socket.username, message: `${socket.username} has disconnected` });
        console.log("User disconnected: ", socket.id);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
