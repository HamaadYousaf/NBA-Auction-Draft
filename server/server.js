import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { postLogin, postRegiser } from './controllers/loginController.js';
import { draftTimer, draftFeed } from './controllers/draftController.js';
import { sessionMiddleware } from './middleware/sessionMiddleware.js';
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
app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

//Routes
app.post('/login', postLogin);
app.post('/register', postRegiser);

io.on('connection', socket => {
    socket.on('joinedRoom', (room) => {
        draftFeed(socket, room);
    });
    socket.on('start-timer', () => {
        draftTimer(socket);
    });
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");

        httpServer.listen(PORT, () => {
            console.log(`server is listening on port: ${PORT}...`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
