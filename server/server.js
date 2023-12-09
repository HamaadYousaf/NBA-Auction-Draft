import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import loginRoute from './routes/loginRoute.js';
import { draftTimer } from './controllers/draftController.js';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use('/login', loginRoute);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('start-timer', () => {
        draftTimer(socket);
    });
})

httpServer.listen(3000, () => {
    console.log(`server is listening on port 3000`);
});
