import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import { connectDB } from './config/connectDB.js';
import { config } from 'dotenv';
import { sessionMiddleware } from './middleware/session.js';
import { socketMiddleware } from './middleware/socket.js';
import draftRoutes from './routes/draftRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import userRoutes from './routes/userRoutes.js';
config({ path: '../.env' });

connectDB();
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        autoConnect: false
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionMiddleware);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//Routes
app.use('/login', loginRoutes);
app.use('/draft', draftRoutes);
app.use('/user', userRoutes);

socketMiddleware(io);

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
