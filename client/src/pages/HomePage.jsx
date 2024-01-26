import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReq } from '../services/draftService';
import DisplayTeams from '../components/DisplayTeams';
import Header from '../components/Header';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const HomePage = () => {
    const navigate = useNavigate();

    const user = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [numUsers, setNumUsers] = useState();
    const [users, setUsers] = useState([]);
    const [isRunning, setIsRunning] = useState();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(res => {
                setIsLoggedIn(true);
                user.current = res.data.data;
            })
            .catch(() => navigate('/login'));

    }, [navigate]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            setNumUsers(await getReq('/room/users'));
            setUsers(await getReq('/room/users/names'));
            setIsRunning(await getReq('/room/run'));
            setIsLoading(false)
        }

        if (isLoggedIn) fetch();
    }, [isLoggedIn])

    const handleClick = () => {
        navigate('/draft-room');
    }

    return (
        <>
            <Header />
            <Container sx={{ my: 8 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Home
                </Typography>
                <Paper elevation={3} sx={{ my: 5, py: 2, px: { xs: 2, sm: 5 }, justifyContent: 'space-between', display: 'flex' }}>
                    <div>
                        <Typography variant="h5" component="div">
                            Draft Room
                        </Typography>
                        <Box>
                            {
                                isLoading ? (
                                    <LinearProgress sx={{ width: 50, mt: 1 }} />
                                ) : (
                                    <Typography color="text.secondary">Players: {numUsers} / 5</Typography>
                                )
                            }
                        </Box>
                    </div>
                    {isRunning ? (
                        <Typography variant="h6" color="text.secondary" sx={{ m: 2 }}>Draft Started</Typography>
                    ) : (
                        <>
                            {numUsers === 2 && !users.includes(user.current) ? (
                                <Typography variant="h6" color="text.secondary" sx={{ m: 2 }}>Room full</Typography>
                            ) : (
                                <Button onClick={handleClick} variant="contained" sx={{ m: 1 }}>Join</Button>
                            )}
                        </>
                    )}
                </Paper>
                <Typography variant="h4" align="center" color="text.secondary" paragraph sx={{ mt: 8, mb: 4 }}>
                    Your Teams
                </Typography>
                {isLoggedIn ? (<DisplayTeams />) : (<></>)}
            </Container >
        </>
    )
}

export default HomePage