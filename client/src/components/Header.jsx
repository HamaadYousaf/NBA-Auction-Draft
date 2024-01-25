import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import { postReq } from '../services/draftService';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Header({ page }) {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (await postReq('/login/logout')) {
            navigate('/login');
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    {page === 'draft-page' ? (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: { sx: 1, sm: 2 } }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    ) : (<></>)
                    }
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NBA Draft
                    </Typography>
                    <Button color="inherit" onClick={handleClick}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

Header.propTypes = {
    page: PropTypes.string,
};

