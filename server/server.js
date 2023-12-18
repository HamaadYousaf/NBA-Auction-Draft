import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { postLogin, postRegiser } from './controllers/loginController.js';
import { draftTimer, draftFeed } from './controllers/draftController.js';
import { joinUser, getUsersInRoom, leaveUser } from './controllers/userController.js';
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
        joinUser(socket);
        const num = getUsersInRoom();
        socket.broadcast.to(room).emit('get-num-users', num);
        socket.emit('get-num-users', num);
        draftFeed(socket, room);
    });

    socket.on('start-timer', () => {
        draftTimer(socket);
    });

    socket.on('disconnect', () => {
        socket.broadcast.to('draft-room').emit('feed', `${socket.id} has left the draft room`, "3:00PM");
        socket.leave('draft-room');
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
