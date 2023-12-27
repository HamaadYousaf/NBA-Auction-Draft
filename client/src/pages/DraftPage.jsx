import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";
import * as draft from '../services/draftService.js';

const DraftPage = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    let isHost = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [timer, setTimer] = useState(draft.getTimeCache() || '');
    const [numUsers, setNumUsers] = useState(1);
    const [isRunning, setIsRunning] = useState(localStorage.getItem('running') || false);
    const [player, setPlayer] = useState(draft.getPlayerCache() || '');
    const [feed, setFeed] = useState(
        JSON.parse(localStorage.getItem('feed')) ||
        [
            {
                "msg": "Welcome to the draft room",
                "time": "3:00PM"
            },
        ]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            setPlayer(await draft.getPlayerCache());
            setTimer(await draft.getTimeCache());
            setIsLoading(false)
        }
        fetch()
    }, [])

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(() => setIsLoggedIn(true))
            .catch(() => navigate('/login'));
    }, [navigate])

    useEffect(() => {
        if (isLoggedIn) {
            if (socket === null) return;
            draft.setUsersRoom();
            socket.emit('joined-room', 'draft-room');
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:3000/draft/users',)
                .then(res => {
                    if (res.status === 200) {
                        setNumUsers(res.data.data.length);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [socket, isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            if (socket == null) return;

            socket.on('user-joined', () => {
                axios.defaults.withCredentials = true;
                axios.get('http://localhost:3000/draft/users',)
                    .then(res => {
                        if (res.status === 200) {
                            setNumUsers(res.data.data.length);
                        }
                    })
                    .catch((err) => console.log(err));
            });
            socket.on('timer', (time) => { setTimer(time); draft.setTimeCache(time); });
            socket.on('get-player', (player) => { draft.setPlayerCache(player); setPlayer(player) });

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
                    {numUsers === 1 && isHost.current ? (
                        <>
                            <button onClick={handleClick}>Start</button>
                        </>
                    ) : (<></>)}
                    <span>Players in draft room = {numUsers}</span>
                </>) : (
                <>
                    <span>Timer = {isLoading ? (<>...</>) : (<>{timer}</>)}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span><img src={player.image} alt={player.name}></img></span>
                    <span>Player: {isLoading ? (<>...</>) : (<>{player.name}</>)}&nbsp;&nbsp;&nbsp;</span>
                    <span>
                        Team: {isLoading ? (<>...</>) : (<>{player.team}</>)}&nbsp;
                        Position: {isLoading ? (<>...</>) : (<>{player.pos}</>)}&nbsp;
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
