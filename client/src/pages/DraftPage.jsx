import { useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const DraftPage = () => {
    const [socket, setSocket] = useState();
    const [timer, setTimer] = useState();
    const [isRunnning, setIsRunning] = useState(false);
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

    //Connect socket.io
    useEffect(() => {
        const s = io('http://localhost:3000');
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    //handle draft sockets
    useEffect(() => {
        if (socket == null) return;

        socket.on('countdown', (time) => { setTimer(time) });
        socket.on('getPlayer', (player) => { setPlayer(player) });
        socket.on('draftComplete', () => { setIsRunning(false) });

        return () => {
            socket.off('countdown');
            socket.off('getPlayer');
            socket.off('draftComplete');

        }
    }, [socket, timer, player]);

    const handleClick = () => {
        socket.emit("start-timer");
        setIsRunning(true);
    }
    return (
        <div>
            {!isRunnning ? (
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
        </div>
    )
}

export default DraftPage
