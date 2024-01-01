import { createRequire } from 'node:module';
const players = createRequire(import.meta.url)('../../config/players.json');

export const draftTimer = async (socket, io) => {
    socket.on('host', async () => {
        for (let i = 1; i < 6; i++) {
            let time = 10;
            let player = players[`player${i}`];
            io.to('draft-room').emit('get-player', player);
            io.to('draft-room').emit('timer', time);

            for (let j = 0; j < 11; j++) {
                io.to('draft-room').emit('timer', time--);
                await sleep(1000);
            }
            await sleep(2000);
        }
        io.to('draft-room').emit('feed', 'Draft complete', '3:00PM');
        await sleep(5000);
        io.to('draft-room').emit('draft-complete');
    })
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
