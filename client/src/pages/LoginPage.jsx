import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        let user = { username: username, password: password };

        axios.post('http://localhost:3000/login', user)
            .then(function (response) {
                if (response.status === 200) {
                    navigate('/home');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <input type="submit" value="Login" />
        </form>
    )
}

export default LoginPage
