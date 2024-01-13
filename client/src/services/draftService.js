import axios from 'axios';

export const getReq = async (route) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.get(`http://localhost:3000${route}`)
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

export const postReq = async (route, param) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.post(`http://localhost:3000${route}`, param)
            .then(res => {
                if (res.status === 201) {
                    return resolve(true);
                }
            })
            .catch((err) => { return reject(err) });
    })
}

export const delReq = async (route) => {
    return new Promise((resolve, reject) => {
        axios.defaults.withCredentials = true;
        axios.delete(`http://localhost:3000${route}`)
            .then(res => {
                if (res.status === 200) {
                    return resolve(true);
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