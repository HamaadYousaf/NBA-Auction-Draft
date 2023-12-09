import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const HomePage = () => {
    const [socket, setSocket] = useState();

    //Connect socket.io
    useEffect(() => {
        const s = io('http://localhost:3000');
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    const handleClick = () => {
        socket.emit('joinedRoom');

    }

    return (
        <div>
            <span>Join the draft room: </span>
            <button onClick={handleClick}>Join Room</button>
        </div>
    )
}

export default HomePage