import { useState, useEffect, useContext, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";

const DraftPage = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    let isHost = useRef(false);
    const [timer, setTimer] = useState();
    const [numUsers, setNumUsers] = useState();
    const [isRunning, setIsRunning] = useState(false);
    const [player, setPlayer] = useState({
        "name": "",
        "image": "",
        "team": "",
        "pos": ""
    });
    const [feed, setFeed] = useState([
        {
            "msg": "Welcome to the draft room",
            "time": "3:00PM"
        },
    ]);

    useEffect(() => {
        if (socket === null) return;

        socket.emit('joined-room', 'draft-room');
    }, [socket]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('timer', (time) => setTimer(time));
        socket.on('get-player', (player) => setPlayer(player));
        socket.on('get-num-users', (num) => setNumUsers(num));
        socket.on('run-draft', () => setIsRunning(true));
        socket.on('feed', (msg, time) => {
            const newFeed = [
                ...feed,
                {
                    "msg": msg,
                    "time": time

                }
            ];
            setFeed(newFeed);
        })

        if (numUsers === 1) {
            isHost.current = true;
            socket.emit('isHost');
        }

        socket.on('draft-complete', () => {
            setIsRunning(false);
            navigate('/home');
        });

        return () => {
            socket.removeAllListeners();
        }
    }, [socket, timer, player, numUsers, isRunning, feed, navigate]);

    const handleClick = () => {
        socket.emit("start-timer");
        setIsRunning(true);
    }

    return (
        <div>
            {!isRunning ? (
                <>
                    <span>Waiting for host to begin draft</span>
                    {numUsers === 2 && isHost.current ? (
                        <>
                            <button onClick={handleClick}>Start</button>
                        </>
                    ) : (<></>)}
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
            <div style={{ backgroundColor: "#EEEEEE", display: "grid" }}>
                {
                    feed.map((log) => {
                        return (<span key={uuidv4()}>{log.msg}&nbsp;&nbsp;{log.time}</span>)
                    })
                }
            </div>
        </div>
    )
}

export default DraftPage
