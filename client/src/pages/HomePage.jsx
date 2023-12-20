import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('logged-in')) {
            navigate('/login');
        }
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