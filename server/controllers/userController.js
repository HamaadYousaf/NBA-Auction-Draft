const users = [];
let host = null;

export const joinUser = (socket) => {
    users.push(socket.id);
}

export const getUsersInRoom = () => {
    return users.length;
}

export const leaveUser = (socket) => {
    const index = users.findIndex(id => id === socket.id);

    if (index !== -1) {
        users.splice(index, 1)[0];
    }

    return users.length;
}

export const setHost = (socket) => {
    host = socket.id;
}

export const getHost = () => {
    return host;
}