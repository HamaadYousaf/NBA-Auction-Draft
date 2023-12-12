import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import loginRoute from './routes/loginRoute.js';
import { draftTimer, draftFeed } from './controllers/draftController.js';
import { sessionMiddleware, wrap } from './middleware/sessionMiddleware.js';

const app = express();
const httpServer = createServer(app);

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
io.use(wrap(sessionMiddleware));

//Routes
app.use('/login', loginRoute);

io.on('connection', socket => {
    socket.on('joinedRoom', (room) => {
        draftFeed(socket, room);
    });
    socket.on('start-timer', () => {
        draftTimer(socket);
    });
})

httpServer.listen(3000, () => {
    console.log(`server is listening on port 3000`);
});
