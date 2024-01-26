import moment from 'moment';
import { createRequire } from 'node:module';
const players = createRequire(import.meta.url)('../../config/players.json');

let player = '';

export const draftTimer = async (socket, io) => {
    socket.on('host', async () => {
        for (let i = 1; i < 6; i++) {
            let time = 10;
            player = players[`player${i}`];
            io.to('draft-room').emit('get-player', player);
            io.to('draft-room').emit('timer', time);

            for (let j = 0; j < 6; j++) {
                io.to('draft-room').emit('timer', time--);
                await sleep(1000);
            }
            io.to('draft-room').emit('round-complete');
            await sleep(3000);
        }
        io.to('draft-room').emit('feed', 'Draft complete', moment().format('h:mm a'));
        io.to('draft-room').emit('handle-complete');
        await sleep(7000);
        io.to('draft-room').emit('draft-complete');
    })
}

export const bidHandler = async (socket, io) => {
    socket.on('bid', (user, amount) => {
        io.to('draft-room').emit('bid-update', user, amount);
    })

    socket.on('handle-bid', async (user, bidData) => {
        if (bidData.bidder === user) {
            io.to('draft-room').emit('feed', `${bidData.bidder} drafted ${player.name} for $${bidData.bid}`, moment().format('h:mm a'));
            io.to('draft-room').emit('bid-update', '', 0);
        }
    })
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
