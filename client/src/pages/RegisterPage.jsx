import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === password2) {
            const user = { username, password };

            axios.post('http://localhost:3000/login/create-account', user)
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

        } else {
            setLoginFailed(true);
        }
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
                {loginFailed ? (<>Passwords do not match</>) : (<></>)}
                <label>Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {loginFailed ? (<>Passwords do not match</>) : (<></>)}
                <label>Confirm Password:
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </label>
                <input type="submit" value="Create Account" />
            </form>
            <span>Already have an account? <a href="/login">Login Here</a></span>
        </>
    )
}

export default RegisterPage
