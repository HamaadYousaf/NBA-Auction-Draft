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
        "pos": "",
        "FG": "",
        "FT": "",
        "3PM": "",
        "PTS": "",
        "TREB": "",
        "AST": "",
        "STL": "",
        "BLK": "",
        "TO": ""
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
                    <span>Player = {player.name}&nbsp;&nbsp;&nbsp;</span>
                    <span>
                        {player.team}&nbsp;
                        {player.pos}&nbsp;
                        {player.FG}&nbsp;
                        {player.FT}&nbsp;
                        {player['3PM']}&nbsp;
                        {player.PTS}&nbsp;
                        {player.TREB}&nbsp;
                        {player.AST}&nbsp;
                        {player.STL}&nbsp;
                        {player.BLK}&nbsp;
                        {player.TO}&nbsp;
                    </span>
                </>)
            }
            <Feed socket={socket} />
        </div>
    )
}

export default DraftPage
