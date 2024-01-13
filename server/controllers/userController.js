import { User } from '../models/userModel.js';

export const getUserTeams = async (req, res) => {
    if (!req.session.user) return res.status(404).json({ sucess: true, msg: "no user" });

    const user = await User.findOne({ username: req.session.user });

    if (user) {
        return res.status(200).json({ sucess: true, data: user.userTeams });
    } else {
        return res.status(404).json({ sucess: false, msg: "user not foud" });
    }
}

export const setUserTeams = async (req, res) => {
    if (!req.session.user) return res.status(404).json({ sucess: true, msg: "no user" });

    const userData = await User.findOne({ username: req.session.user });
    const newUserTeams = [...userData.userTeams, userData.team];
    await User.findOneAndUpdate({ username: req.session.user }, { team: [], userTeams: newUserTeams, bidAmount: 200 });

    return res.status(201).json({ sucess: true, msg: "user team saved" })
}

export const addPlayerTeam = async (req, res) => {
    if (!req.session.user) return res.status(404).json({ sucess: true, msg: "no user" });

    if (req.body.bidData.bidder === req.session.user) {
        const userData = await User.findOne({ username: req.session.user });
        const newTeam = [...userData.team, req.body.player];
        const newBidAmount = userData.bidAmount - req.body.bidData.bid;

        await User.findOneAndUpdate({ username: req.session.user }, { team: newTeam, bidAmount: newBidAmount });

        return res.status(201).json({ sucess: true, msg: "player saved to team" })
    }
}