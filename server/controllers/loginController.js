import fs from 'fs';

const postLogin = (req, res) => {
    fs.readFile('../config/users.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const dataParsed = JSON.parse(data);
            const writeData = {
                ...dataParsed,
                [req.body.username]: {
                    "password": req.body.password
                }
            }
            fs.writeFile('../config/users.json', JSON.stringify(writeData, null, 2), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    })

    res.status(200).json({ sucess: true, data: "loggin in" })
}

export default postLogin;