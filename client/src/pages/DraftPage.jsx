import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";
import * as draft from '../services/draftService.js';

const DraftPage = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    const user = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [timer, setTimer] = useState();
    const [numUsers, setNumUsers] = useState();
    const [isRunning, setIsRunning] = useState();
    const [player, setPlayer] = useState({
        "name": "",
        "image": "",
        "team": "",
        "pos": ""
    });
    const [feed, setFeed] = useState(
        JSON.parse(localStorage.getItem('feed')) ||
        [
            {
                "msg": "Welcome to the draft room",
                "time": ""
            },
        ]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            await draft.setUsersRoom();
            setPlayer(await draft.getPlayerCache());
            setTimer(await draft.getTimeCache());
            setNumUsers(await draft.getUsersRoom());
            setIsRunning(await draft.getRunning());
            setIsLoading(false)
        }

        if (isLoggedIn) fetch();
    }, [isLoggedIn, numUsers])

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(res => {
                setIsLoggedIn(true);
                user.current = res.data.data;
            })
            .catch(() => navigate('/login'));
    }, [navigate])

    useEffect(() => {
        if (isLoggedIn) {
            if (socket === null) return;

            const fetch = async () => {
                setIsLoading(true);
                await draft.setUsersRoom();
                setNumUsers(await draft.getUsersRoom());
                socket.emit('joined-room', 'draft-room', user.current);
                setIsLoading(false)
            }
            fetch();
        }
    }, [socket, isLoggedIn, user]);

    useEffect(() => {
        if (isLoggedIn) {
            if (socket == null) return;

            socket.on('user-joined', async () => {
                setIsLoading(true);
                setNumUsers(await draft.getUsersRoom());
                console.log(numUsers)
                setIsLoading(false)
            });
            socket.on('timer', (time) => { setTimer(time); draft.setTimeCache(time); });
            socket.on('get-player', (player) => { draft.setPlayerCache(player); setPlayer(player) });
            socket.on('run-draft', () => setIsRunning(true));

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

            socket.on('draft-complete', async () => {
                if (await draft.clearRoom() && await draft.clearRunning()) {
                    localStorage.clear();
                    setIsRunning(false);
                    navigate('/home');
                }
            });
        }

        return () => {
            socket.removeAllListeners();
        }
    }, [socket, timer, player, numUsers, isRunning, feed, isLoggedIn, navigate]);

    const handleClick = async () => {
        if (!isRunning) {
            if (await draft.setRunning()) {
                socket.emit("start-timer");
                socket.emit('host');
                setIsRunning(true);
            }
        }
    }

    const handleLeave = async () => {
        if (await draft.leaveUser()) {
            socket.emit('leave-room');
            navigate('/home')
        }
    }

    return (
        <div>
            <span><button onClick={handleLeave}>Leave Room</button></span>
            {!isRunning ? (
                <>
                    <span>Waiting for host to begin draft</span>
                    {numUsers === 2 ? (
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
