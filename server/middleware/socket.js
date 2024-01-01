import { draftTimer } from '../utils/draftUtils.js';
import { sessionMiddleware } from './session.js';

export const socketMiddleware = (io) => {
    io.engine.use(sessionMiddleware);

    io.on('connection', socket => {
        socket.on('joined-room', (room) => {
            socket.join('draft-room');
            socket.broadcast.to('draft-room').emit('feed', `${socket.id} has joined the draft room`, '3:00PM');
            socket.broadcast.to('draft-room').emit('user-joined');
        });

        socket.on('start-timer', () => {
            socket.broadcast.to('draft-room').emit('run-draft');
            io.to('draft-room').emit('feed', 'The host has started the draft', '3:00PM');
            draftTimer(socket, io);
        });

        socket.on('disconnect', () => {
            socket.leave('draft-room');
            socket.broadcast.to('draft-room').emit('feed', `${socket.id} has left the draft room`, '3:00PM');
            socket.removeAllListeners();
        })

        socket.on('leave-room', () => {
            socket.leave('draft-room');
            socket.broadcast.to('draft-room').emit('feed', `${socket.id} has left the draft room`, '3:00PM');
            socket.broadcast.to('draft-room').emit('user-joined');
            socket.removeAllListeners();
        })
    })
}