import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const users = require('../../config/users.json');

const postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username in users && password === users[username].password) {

        if (req.session.user === undefined) {
            req.session.user = username;
            console.log("Express Session: ");
            console.log(req.session);
        }
        return res.status(200).json({ sucess: true, data: "loggin in" })
    }

    return res.status(401).json({ sucess: false, data: "unauthorized" })
}

export default postLogin;