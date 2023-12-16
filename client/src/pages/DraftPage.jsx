import { useState, useEffect, useContext } from 'react'
import Feed from '../components/Feed';
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";

const DraftPage = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [timer, setTimer] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [player, setPlayer] = useState({
        "name": "",
        "image": "",
        "team": "",
        "pos": ""
    });

    useEffect(() => {
        if (socket === null) return;

        socket.emit('joinedRoom', 'draftRoom');
    }, [socket]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('countdown', (time) => { setTimer(time) });
        socket.on('getPlayer', (player) => { setPlayer(player) });
        socket.on('draftComplete', () => {
            setIsRunning(false);
            navigate('/home');
        });

        return () => {
            socket.off('countdown');
            socket.off('getPlayer');
            socket.off('draftComplete');

        }
    }, [socket, timer, player, navigate]);

    const handleClick = () => {
        socket.emit("start-timer");
        setIsRunning(true);
    }

    return (
        <div>
            {!isRunning ? (
                <>
                    <span>Waiting for host to begin draft</span>
                    <button onClick={handleClick}>Start</button>
                </>) : (
                <>
                    <span>Timer = {timer}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span><img src={player.image} alt={player.name}></img></span>
                    <span>Player: {player.name}&nbsp;&nbsp;&nbsp;</span>
                    <span>
                        Team: {player.team}&nbsp;
                        Position: {player.pos}&nbsp;
                    </span>
                </>)
            }
            <Feed socket={socket} />
        </div>
    )
}

export default DraftPage
