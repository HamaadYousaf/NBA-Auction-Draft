import { draftTimer, bidHandler } from '../utils/draftUtils.js';
import { sessionMiddleware } from './session.js';
import { User } from '../models/userModel.js';
import moment from 'moment';

export const socketMiddleware = (io) => {
    io.engine.use(sessionMiddleware);

    io.on('connection', socket => {
        socket.on('joined-room', (user) => {
            if (user) {
                socket.join('draft-room');
                socket.broadcast.to('draft-room').emit('user-joined');
            }
            bidHandler(socket, io);
        });

        socket.on('start-timer', async (user) => {
            if (user) {
                socket.broadcast.to('draft-room').emit('run-draft');
                io.to('draft-room').emit('feed', 'The host has started the draft', moment().format('h:mm a'));
                draftTimer(socket, io, user);
                // bidHandler(socket, io);
            }
        });

        socket.on('disconnect', () => {
            socket.leave('draft-room');
            socket.broadcast.to('draft-room').emit('user-joined');
            socket.removeAllListeners();
        });

        socket.on('leave-room', (user) => {
            if (user) {
                socket.leave('draft-room');
                socket.broadcast.to('draft-room').emit('user-joined');
                socket.removeAllListeners();
            }
        });
    })
}