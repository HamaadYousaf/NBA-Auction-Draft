import axios from 'axios';

export const getTimeCache = async () => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/draft/time',)
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
        axios.get('http://localhost:3000/draft/player',)
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
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/draft/users')
        .catch((err) => console.log(err));
}

export const getUsersRoom = async () => {
    axios.defaults.withCredentials = true;
    await axios.get('http://localhost:3000/draft/users',)
        .then(res => {
            if (res.status === 200) {
                const num = res.data.data.length;
                return num;
            }
        })
        .catch((err) => console.log(err));
}

export const clearRoom = async () => {

}