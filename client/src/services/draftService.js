import axios from 'axios';

export const getTimeCache = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/draft/time',)
        .then(res => {
            if (res.status === 200) {
                if (res.data.data === null) {
                    return '';
                }
                return res.data.data;
            }
        })
        .catch((err) => console.log(err));
}

export const setTimeCache = (time) => {
    const timeData = { "time": time };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/draft/time', timeData)
        .catch((err) => console.log(err));
}

export const getPlayerCache = () => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/draft/player',)
        .then(res => {
            if (res.status === 200) {
                if (res.data.data === null) {
                    return '';
                }
                return res.data.data;
            }
        })
        .catch((err) => console.log(err));
}

export const setPlayerCache = (player) => {
    const playerData = { "player": player };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3000/draft/player', playerData)
        .catch((err) => console.log(err));
}