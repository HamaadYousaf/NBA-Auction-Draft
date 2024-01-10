import { draftTimer, bidHandler } from '../utils/draftUtils.js';
import { sessionMiddleware } from './session.js';
import moment from 'moment';

export const socketMiddleware = (io) => {
    io.engine.use(sessionMiddleware);
    let user;

    io.on('connection', socket => {
        socket.on('joined-room', (room, username) => {
            user = username;
            if (user) {
                socket.join('draft-room');
                socket.broadcast.to('draft-room').emit('feed', `${user} has joined the draft room`, moment().format('h:mm a'));
                socket.broadcast.to('draft-room').emit('user-joined');
            }
            bidHandler(socket, io);
        });

        socket.on('start-timer', () => {
            socket.broadcast.to('draft-room').emit('run-draft');
            io.to('draft-room').emit('feed', 'The host has started the draft', moment().format('h:mm a'));
            draftTimer(socket, io);
            // bidHandler(socket, io);
        });

        socket.on('disconnect', () => {
            if (user) {
                socket.leave('draft-room');
                socket.broadcast.to('draft-room').emit('user-joined');
                socket.removeAllListeners();
            }
        })

        socket.on('leave-room', () => {
            if (user) {
                socket.leave('draft-room');
                socket.broadcast.to('draft-room').emit('feed', `${user} has left the draft room`, moment().format('h:mm a'));
                socket.broadcast.to('draft-room').emit('user-joined');
                socket.removeAllListeners();
            }
        })
    })
}