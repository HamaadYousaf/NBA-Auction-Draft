import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { postLogin, postRegiser } from './controllers/loginController.js';
import { draftTimer } from './controllers/draftController.js';
import { joinUser, getUsersInRoom, leaveUser, setHost } from './controllers/userController.js';
config({ path: '../.env' })

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.post('/login', postLogin);
app.post('/register', postRegiser);

io.on('connection', socket => {
    socket.on('joined-room', (room) => {
        socket.join('draft-room');
        joinUser(socket);
        socket.broadcast.to('draft-room').emit('feed', `${socket.id} has joined the draft room`, '3:00PM');

        const num = getUsersInRoom();
        socket.broadcast.to(room).emit('get-num-users', num);
        socket.emit('get-num-users', num);
    });

    socket.on('isHost', () => {
        setHost(socket);
    })

    socket.on('start-timer', () => {
        socket.broadcast.to('draft-room').emit('run-draft');
        io.to('draft-room').emit('feed', 'The host has started the draft', '3:00PM');
        draftTimer(socket, io);
    });

    socket.on('disconnect', () => {
        socket.leave('draft-room');
        socket.broadcast.to('draft-room').emit('feed', `${socket.id} has left the draft room`, '3:00PM');

        const num = leaveUser(socket);
        socket.broadcast.to('draft-room').emit('get-num-users', num);
        socket.emit('get-num-users', num);
        socket.removeAllListeners();
    })
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");

        httpServer.listen(PORT, () => {
            console.log(`server is listening on port ${PORT}...`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
