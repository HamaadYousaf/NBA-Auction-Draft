import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReq } from '../services/draftService';
import DisplayTeams from '../components/DisplayTeams';
import Header from '../components/Header';

const HomePage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [numUsers, setNumUsers] = useState();
    const [isRunning, setIsRunning] = useState();

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(setIsLoggedIn(true))
            .catch(() => navigate('/login'));

    }, [navigate]);

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            setNumUsers(await getReq('/room/users'));
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
                        <Typography color="text.secondary">
                            {
                                isLoading ? (
                                    <>
                                        Players: ...
                                    </>
                                ) : (
                                    <>Players: {numUsers} / 5</>
                                )
                            }
                        </Typography>
                    </div>
                    {isRunning ? (
                        <Typography variant="h6" color="text.secondary" sx={{ m: 2 }}>Draft Started</Typography>
                    ) : (
                        <>
                            {numUsers === 2 ? (
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