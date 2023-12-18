import { useState, useEffect, useContext } from 'react'
import Feed from '../components/Feed';
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";

const DraftPage = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [timer, setTimer] = useState();
    const [numUsers, setNumUsers] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [player, setPlayer] = useState({
        "name": "",
        "image": "",
        "team": "",
        "pos": ""
    });

    useEffect(() => {
        if (socket === null) return;

        socket.emit('joined-room', 'draft-room');
    }, [socket]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('timer', (time) => setTimer(time));
        socket.on('get-player', (player) => setPlayer(player));
        socket.on('get-num-users', (num) => setNumUsers(num));
        socket.on('draft-complete', () => {
            setIsRunning(false);
            navigate('/home');
        });

        return () => {
            socket.off('timer');
            socket.off('get-player');
            socket.off('draft-complete');
            socket.off('get-num-users')

        }
    }, [socket, timer, player, numUsers, navigate]);

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
                    <span>Players in draft room = {numUsers}</span>
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
