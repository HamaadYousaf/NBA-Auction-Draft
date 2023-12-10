import React from "react"
import { io } from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io('http://localhost:3000');

export const SocketContext = React.createContext();
