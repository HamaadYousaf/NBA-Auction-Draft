import { createRequire } from 'node:module';
const players = createRequire(import.meta.url)('../../config/players.json');

export const draftTimer = async (socket) => {
    console.log(socket.request.session)
    for (let i = 1; i < 6; i++) {
        let time = 10;
        let player = players[`player${i}`];
        socket.emit('getPlayer', player);
        socket.emit('countdown', time);

        for (let j = 0; j < 11; j++) {
            socket.emit('countdown', time--);
            await sleep(1000);
        }
        await sleep(2000);
    }
    socket.emit('draftComplete');
}

export const draftFeed = (socket, room) => {
    socket.join(room);

    socket.to(room).emit('feed', `${socket.id} has joined the draft room`, "3:00PM");
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
