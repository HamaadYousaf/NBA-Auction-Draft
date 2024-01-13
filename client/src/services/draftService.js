import axios from 'axios';

export const getTimeCache = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/draft/time')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data === null) {
                        return '';
                    }
                    return resolve(res.data.data);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const setTimeCache = (time) => {
    const timeData = { "time": time };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/draft/time', timeData)
        .catch((err) => console.log(err));
}

export const getPlayerCache = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/draft/player')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data === null) {
                        return '';
                    }
                    return resolve(res.data.data);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const setPlayerCache = (player) => {
    const playerData = { "player": player };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/draft/player', playerData)
        .catch((err) => console.log(err));
}

export const setUsersRoom = () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/room/users')
            .then(resolve())
            .catch((err) => { return reject(err) });
    })
}

export const getUsersRoom = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/room/users')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data === null) {
                        return '';
                    }
                    const length = res.data.data.length;
                    return resolve(length);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const leaveUser = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3000/room/users')
            .then(res => {
                if (res.status === 201) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const clearRoom = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.delete('http://localhost:3000/room/users')
            .then(res => {
                if (res.status === 200) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const setRunning = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/room/run')
            .then(res => {
                if (res.status === 201) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const getRunning = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/room/run')
            .then(res => {
                if (res.status === 200) {
                    return resolve(res.data.data);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const clearRunning = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3000/room/run')
            .then(res => {
                if (res.status === 201) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const getBidCache = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/draft/bid')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.data === null) {
                        return { bid: 0, bidder: "" };
                    }
                    const bidData = { bid: parseInt(res.data.data.bid) || 0, bidder: res.data.data.bidder }
                    return resolve(bidData);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const setBidCache = (bid) => {
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/draft/bid', bid)
        .catch((err) => console.log(err));
}

export const clearBidCache = () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.delete('http://localhost:3000/draft/bid')
            .then(res => {
                if (res.status === 200) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const savePlayerTeam = async (player, bidData) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/user/player', { player, bidData })
            .then(res => {
                if (res.status === 200) {
                    return resolve();
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const saveTeam = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3000/user/team')
            .then(res => {
                if (res.status === 200) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}