import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .catch(() => navigate('/login'));

    }, [navigate]);

    const handleClick = () => {
        navigate('/draft-room');
    }

    return (
        <div>
            <span>Join the draft room: </span>
            <button onClick={handleClick}>Join Room</button>
        </div>
    )
}

export default HomePage