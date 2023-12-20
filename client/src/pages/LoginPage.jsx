import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        let user = { username: username, password: password };

        axios.post('http://localhost:3000/login', user)
            .then(function (res) {
                if (res.status === 200) {
                    sessionStorage.setItem('logged-in', username);
                    navigate('/home');
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    console.log("Invalid credentials");
                }
            });
    }

    return (
        <>
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
            <span>Dont have an account? <a href="/register">Register Here</a></span>
        </>
    )
}

export default LoginPage
