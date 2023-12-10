import { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../socketConfig';

const Feed = () => {
    const socket = useContext(SocketContext);

    const [feed, setFeed] = useState([
        {
            "msg": "Welcome to the draft room",
            "time": "3:00PM"
        },
    ]);

    useEffect(() => {
        if (socket == null) return;

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

        return () => {
            socket.off('feed');
        }
    }, [socket, feed]);

    return (
        <div style={{ backgroundColor: "#EEEEEE", display: "grid" }}>
            {
                feed.map((log) => {
                    return (<span key={log.msg}>{log.msg}&nbsp;&nbsp;{log.time}</span>)
                })
            }
        </div>
    )
}

export default Feed