import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(res => {
                if (res.status === 200) {
                    navigate('/home');
                }
            })
            .catch(() => navigate('/login'));

    }, [navigate])

    const handleSubmit = (event) => {
        event.preventDefault();

        let user = { username: username, password: password };

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/login', user)
            .then(res => {
                if (res.status === 200) {
                    navigate('/home');
                }
            })
            .catch(error => {
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
