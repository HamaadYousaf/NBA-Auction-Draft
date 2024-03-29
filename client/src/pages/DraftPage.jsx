import axios from 'axios';
import { useState, useEffect, useContext, useRef } from 'react'
import { SocketContext } from '../socketConfig.jsx';
import { useNavigate } from "react-router-dom";
import { getReq, postReq, delReq, getBidCache, leaveUser } from '../services/draftService.js';
import Feed from '../components/Feed.jsx';
import DraftTeam from '../components/DraftTeam.jsx';
import DraftView from '../components/DraftView.jsx';

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
                "msg": "",
                "time": ""
            },
        ]);
    const [bidData, setBidData] = useState({ bid: 0, bidder: "" });

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            await postReq('/room/users');
            setPlayer(await getReq('/draft/player'));
            setTimer(await getReq('/draft/time'));
            setNumUsers(await getReq('/room/users'));
            setIsRunning(await getReq('/room/run'));
            setBidData(await getBidCache());
            setIsLoading(false)
        }

        if (isLoggedIn) fetch();
    }, [isLoggedIn, numUsers]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(res => {
                setIsLoggedIn(true);
                user.current = res.data.data;
            })
            .catch(() => navigate('/login'));
    }, [navigate]);

    useEffect(() => {
        if (isLoggedIn) {
            if (socket === null) return;

            const fetch = async () => {
                setIsLoading(true);
                await postReq('/room/users');
                setNumUsers(await getReq('/room/users'));
                socket.emit('joined-room', user.current);
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
                setNumUsers(await getReq('/room/users'));
                setIsLoading(false)
            });
            socket.on('timer', (time) => { setTimer(time); postReq('/draft/time', { "time": time }); });
            socket.on('get-player', (player) => { postReq('/draft/player', { "player": player }); setPlayer(player) });
            socket.on('run-draft', () => setIsRunning(true));
            socket.on('feed', (msg, time) => {
                if (!feed.includes({ "msg": msg, "time": time })) {
                    const newFeed = new Set([
                        ...feed,
                        {
                            "msg": msg,
                            "time": time

                        }
                    ]);
                    localStorage.setItem('feed', JSON.stringify((Array.from(newFeed))));
                    setFeed(Array.from(newFeed));
                }
            })

            socket.on('bid-update', (user, amount) => {
                setBidData({ bid: amount, bidder: user });
                postReq('/draft/bid', { bid: amount, bidder: user });
            });

            socket.on('round-complete', async () => {
                postReq('/user/player', { player, bidData });
                socket.emit('handle-bid', user.current, bidData);
            });

            socket.on('handle-complete', () => {
                setPlayer({
                    "name": "complete",
                    "image": "...",
                    "team": "...",
                    "pos": "..."
                });
            })

            socket.on('draft-complete', async () => {
                if (await delReq('/room/users') && await delReq('/room/run') && await postReq('/user/team') && await delReq('/draft/bid')) {
                    localStorage.clear();
                    setIsRunning(false);
                    socket.removeAllListeners();
                    navigate('/home');
                }
            });
        }

        return () => {
            socket.removeAllListeners();
        }
    }, [socket, timer, player, numUsers, isRunning, feed, isLoggedIn, bidData, navigate]);

    const handleClick = async () => {
        if (!isRunning) {
            if (await postReq('/room/run')) {
                socket.emit("start-timer", user.current);
                socket.emit('host');
                setIsRunning(true);
            }
        }
    }

    const handleLeave = async () => {
        if (await leaveUser()) {
            socket.emit('leave-room', user.current);
            navigate('/home')
        }
    }

    return (
        <div>
            <DraftView
                handleLeave={handleLeave}
                handleClick={handleClick}
                isRunning={isRunning}
                numUsers={numUsers}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                timer={parseInt(timer)}
                player={player}
                socket={socket}
                user={user.current}
                bidData={bidData}
                draftTeam={<DraftTeam player={player} />}
                feed={<Feed feed={feed} />}
            />
        </div>
    )
}

export default DraftPage
