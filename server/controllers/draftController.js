import { createClient } from 'redis';

const client = createClient({ legacyMode: true });
await client.connect();

export const getTime = async (req, res) => {
    try {
        const time = await getKey('time');
        if (time === undefined) {
            return res.status(200).json({ sucess: true, data: "" });
        }
        return res.status(200).json({ sucess: true, data: time });
    } catch (error) {
        console.log(error);
    }
}

export const postTime = async (req, res) => {
    await client.set('time', req.body.time);
    return res.status(201).json({ sucess: true, msg: "time saved to cache" });
}

export const getPlayer = async (req, res) => {
    try {
        const name = await getKey('player-name');
        const image = await getKey('player-image');
        const team = await getKey('player-team');
        const pos = await getKey('player-pos');
        if (name === null || image === null || team === null || pos === null) {
            return res.status(200).json({ sucess: true, data: "" });
        }

        const player = { name, image, team, pos };
        return res.status(200).json({ sucess: true, data: player });
    } catch (error) {
        console.log(error);
    }

}

export const postPlayer = async (req, res) => {
    await client.set('player-name', req.body.player.name);
    await client.set('player-image', req.body.player.image);
    await client.set('player-team', req.body.player.team);
    await client.set('player-pos', req.body.player.pos);

    return res.status(201).json({ sucess: true, msg: "player saved to cache" });
}

export const setBid = async (req, res) => {
    await client.set('bid', req.body.bid);
    await client.set('bidder', req.body.bidder);

    return res.status(201).json({ sucess: true, msg: "bid saved to cache" });
}

export const getBid = async (req, res) => {
    try {
        const bid = await getKey('bid');
        const bidder = await getKey('bidder');

        if (bid === null || bidder === null) {
            return res.status(200).json({ sucess: true, data: "" });
        }

        const bidData = { bid, bidder };
        return res.status(200).json({ sucess: true, data: bidData });
    } catch (error) {
        console.log(error);
    }
}

export const clearBid = async (req, res) => {
    await client.set('bid', '');
    await client.set('bidder', '');

    return res.status(200).json({ sucess: true, msg: "bid cleared" });
}

const getKey = async (key) => {
    return new Promise(async (resolve, reject) => {
        await client.get(key, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    })
}
