import { User } from '../models/userModel.js'

const postLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const newUser = await User.findOne({ "username": username });

        if (newUser) {
            if (newUser.password === password) {
                req.session.user = newUser.username;

                return res.status(200).json({ sucess: true, data: newUser.username });
            } else {
                return res.status(401).json({ sucess: false, msg: "Invalid credentials" });
            }
        }
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({ sucess: true, data: "loggin in" })

}

export default postLogin;