import { Room } from '../models/roomModel.js';

export const getUsers = async (req, res) => {
    const room = await Room.findOne({ name: 'draft-room' });
    if (room) {
        return res.status(200).json({ sucess: true, data: room.users.length });
    } else {
        return res.status(200).json({ sucess: true, data: "" });
    }
}

export const getUsersNames = async (req, res) => {
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
    return res.status(200).json({ sucess: true, msg: "ending draft" });
}

export const getRunning = async (req, res) => {
    const room = await Room.findOne({ name: 'draft-room' });
    return res.status(200).json({ sucess: true, data: room.running });
}