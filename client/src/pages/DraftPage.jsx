import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";
import { setTimeCache, getTimeCache, setPlayerCache, getPlayerCache } from '../services/draftService.js';

const DraftPage = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    let isHost = useRef(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [timer, setTimer] = useState(getTimeCache() || '');
    const [numUsers, setNumUsers] = useState();
    const [isRunning, setIsRunning] = useState(localStorage.getItem('running') || false);
    const [player, setPlayer] = useState(getPlayerCache() || '');
    const [feed, setFeed] = useState(
        JSON.parse(localStorage.getItem('feed')) ||
        [
            {
                "msg": "Welcome to the draft room",
                "time": "3:00PM"
            },
        ]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .catch(() => navigate('/login'));

        setIsLoggedIn(true);
    }, [navigate])

    useEffect(() => {
        if (isLoggedIn) {
            if (socket === null) return;
            console.log(player)
            socket.emit('joined-room', 'draft-room');
        }
    }, [socket, isLoggedIn, player]);

    useEffect(() => {
        if (isLoggedIn) {
            if (socket == null) return;

            socket.on('get-num-users', (num) => setNumUsers(num));
            socket.on('timer', (time) => { setTimer(time); setTimeCache(time); });
            socket.on('get-player', (player) => { setPlayerCache(player); setPlayer(player) });

            socket.on('run-draft', () => {
                localStorage.setItem('running', true);
                setIsRunning(true)
            });

            socket.on('feed', (msg, time) => {
                const newFeed = [
                    ...feed,
                    {
                        "msg": msg,
                        "time": time

                    }
                ];
                localStorage.setItem('feed', JSON.stringify(newFeed));
                setFeed(newFeed);
            })

            if (numUsers === 1) {
                isHost.current = true;
                socket.emit('isHost');
            }

            socket.on('draft-complete', () => {
                setIsRunning(false);
                localStorage.clear();
                navigate('/home');
            });
        }

        return () => {
            socket.removeAllListeners();
        }
    }, [socket, timer, player, numUsers, isRunning, feed, isLoggedIn, navigate]);

    const handleClick = () => {
        socket.emit("start-timer");
        setIsRunning(true);
        localStorage.setItem('running', true);
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
