import { User } from '../models/userModel.js';

export const getUserTeam = async (req, res) => {
    if (!req.session.user) return res.status(404).json({ sucess: true, msg: "no user" });

    const user = await User.findOne({ username: req.session.user });

    if (user) {
        return res.status(200).json({ sucess: true, data: user.team });
    } else {

        return res.status(404).json({ sucess: false, msg: "user not foud" });
    }
}