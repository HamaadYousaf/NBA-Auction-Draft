import { User } from '../models/userModel.js'

export const postLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const currUser = await User.findOne({ "username": username });

        if (currUser) {
            if (currUser.password === password) {

                return res.status(200).json({ sucess: true, data: currUser.username });
            } else {
                return res.status(401).json({ sucess: false, msg: "Invalid credentials" });
            }
        } else {
            return res.status(401).json({ sucess: false, msg: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
    }
}

export const postRegiser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const currUser = await User.create({
            "username": username,
            "password": password
        });

        return res.status(200).json({ sucess: true, data: currUser.username });
    } catch (error) {
        console.log(error)
    }
    return res.status(404).json({ sucess: false, data: "error creating account" });
}