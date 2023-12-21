import { draftTimer } from '../utils/draftUtils.js';
import { joinUser, getUsersInRoom, leaveUser, setHost } from '../utils/userUtils.js';

export const socketMiddleware = (io) => {
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
}