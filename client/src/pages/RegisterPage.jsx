import axios from 'axios'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

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
            .catch(() => navigate('/register'));

    }, [navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === password2) {
            const user = { username, password };

            axios.post('http://localhost:3000/login/create-account', user)
                .then(res => {
                    if (res.status === 200) {
                        navigate('/home');
                    }
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        console.log("error creating account");
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
