import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();

        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/login',)
            .then(res => {
                if (res.status === 200) {
                    navigate('/home');
                }
            })
            .catch(() => navigate('/register'));

    }, [navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(password)
        console.log(password2)
        if (password === password2) {
            const user = { username, password };

            axios.post('http://localhost:3000/login/create-account', user)
                .then(res => {
                    if (res.status === 200) {
                        navigate('/home');
                    }
                })
                .catch(error => {
                    if (error.response.status === 404) {
                        console.log("error creating account");
                    }
                });
        } else {
            setLoginFailed(true);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {loginFailed ? (
                        <>
                            <TextField
                                error
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}
                    {loginFailed ? (
                        <>
                            <TextField
                                error
                                margin="normal"
                                required
                                fullWidth
                                name="Confirm Password"
                                label="Confirm Password"
                                type="password"
                                id="Confirm Password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Confirm Password"
                                label="Confirm Password"
                                type="password"
                                id="Confirm Password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </>
                    )}
                    {loginFailed ? (
                        <>
                            <Typography variant="subtitle2" color={'red'}>
                                *Passwords do not match
                            </Typography>
                        </>
                    ) : (<></>)}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create
                    </Button>
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Sign in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
}
