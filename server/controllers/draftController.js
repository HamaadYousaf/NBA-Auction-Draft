import { createRequire } from 'node:module';
const players = createRequire(import.meta.url)('../../config/players.json');

export const draftTimer = async (socket) => {
    for (let i = 1; i < 6; i++) {
        let time = 10;
        let player = players[`player${i}`];
        socket.emit('get-player', player);
        socket.emit('timer', time);

        for (let j = 0; j < 11; j++) {
            socket.emit('timer', time--);
            await sleep(1000);
        }
        await sleep(2000);
    }
    socket.emit('draft-complete');
}

export const draftFeed = (socket, room) => {
    socket.join(room);
    socket.broadcast.to('draft-room').emit('feed', `${socket.id} has joined the draft room`, "3:00PM");
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
