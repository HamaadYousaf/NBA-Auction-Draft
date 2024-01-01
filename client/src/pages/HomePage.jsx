import axios from 'axios'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersRoom } from '../services/draftService';

const HomePage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [numUsers, setNumUsers] = useState();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(setIsLoggedIn(true))
            .catch(() => navigate('/login'));

    }, [navigate]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            setNumUsers(await getUsersRoom());
            setIsLoading(false)
        }

        if (isLoggedIn) fetch();
    }, [isLoggedIn])

    const handleClick = () => {
        navigate('/draft-room');
    }

    return (
        <div>
            <span>Join the draft room: </span>
            {
                isLoading ? (
                    <>
                        ...
                    </>
                ) : (
                    <>
                        <span>Users in room: {numUsers}</span>
                        {numUsers === 3 ? (<>Room full</>) : (<><button onClick={handleClick}>Join Room</button></>)}
                    </>
                )
            }
        </div>
    )
}

export default HomePage