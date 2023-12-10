import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

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