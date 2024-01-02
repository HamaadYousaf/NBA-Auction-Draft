import { createClient } from 'redis';
import { Room } from '../models/roomModel.js';

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

export const getUsers = async (req, res) => {
    const room = await Room.findOne({ name: 'draft-room' });
    if (room) {
        return res.status(200).json({ sucess: true, data: room.users });
    } else {
        return res.status(200).json({ sucess: true, data: "" });
    }
}

export const postUsers = async (req, res) => {
    if (!req.session.user) return res.status(200).json({ sucess: true, msg: "no user" });

    const room = await Room.findOne({ name: 'draft-room' });

    if (room) {
        if (room.users.includes(req.session.user)) {
            return res.status(201).json({ sucess: true, msg: "user aleady in room" });
        }
        const newUsers = [...room.users, req.session.user];
        await Room.findOneAndUpdate({ name: "draft-room" }, { users: newUsers });
        return res.status(201).json({ sucess: true, msg: "user added to room" });
    } else {
        await Room.create({
            name: 'draft-room',
            users: new Set([req.session.user]),
        });
        return res.status(201).json({ sucess: true, msg: "user added to room" });
    }
}

export const clearUsers = async (req, res) => {
    await Room.findOneAndUpdate({ name: "draft-room" }, { users: [] });

    return res.status(200).json({ sucess: true, msg: "room cleared" });
}

export const leaveUser = async (req, res) => {
    const room = await Room.findOne({ name: 'draft-room' });
    const newUsers = room.users.filter(user => user != req.session.user);
    await Room.findOneAndUpdate({ name: "draft-room" }, { users: newUsers });

    return res.status(201).json({ sucess: true, msg: "user removed from room" });
}

export const setRunning = async (req, res) => {
    await Room.findOneAndUpdate({ name: "draft-room" }, { running: true });
    return res.status(201).json({ sucess: true, msg: "running draft" });
}

export const clearRunning = async (req, res) => {
    await Room.findOneAndUpdate({ name: "draft-room" }, { running: false });
    return res.status(201).json({ sucess: true, msg: "ending draft" });
}

export const getRunning = async (req, res) => {
    const room = await Room.findOne({ name: 'draft-room' });
    return res.status(200).json({ sucess: true, data: room.running });
}

const getKey = async (key) => {
    return new Promise(async (resolve, reject) => {
        await client.get(key, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    })
}
