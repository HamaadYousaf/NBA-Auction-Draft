import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import Bid from './Bid.jsx';
import Player from './Player.jsx';
import DraftHome from './DraftHome.jsx';


function DraftView(props) {

    const mobile = useMediaQuery('(min-width:400px)');
    const drawerWidth = mobile ? (350) : (250);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            {props.feed}
            <Divider />
            {props.draftTeam}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 1, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        NBA Draft
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.isRunning ?
                    (
                        props.player.name === 'complete' ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '15vh' }}>
                                <Typography variant={mobile ? ('h3') : ('h4')}>Draft Complete</Typography>
                            </Box >
                        ) : (
                            <>
                                {props.isLoading ? (
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: '15vh' }}>
                                        <CircularProgress size='5rem' />
                                    </Box>
                                ) : (
                                    <>
                                        <Player isLoading={props.isLoading} timer={parseInt(props.timer)} player={props.player} />
                                        <Bid socket={props.socket} user={props.user} currBid={props.bidData.bid} currBidder={props.bidData.bidder} player={props.player} />
                                    </>
                                )}
                            </>
                        )
                    )
                    : (
                        <DraftHome numUsers={props.numUsers} handleClick={props.handleClick} handleLeave={props.handleLeave} />
                    )
                }
            </Box>
        </Box >
    );
}

DraftView.propTypes = {
    window: PropTypes.func,
    page: PropTypes.object,
    feed: PropTypes.object,
    socket: PropTypes.object,
    user: PropTypes.string,
    bidData: PropTypes.object,
    draftTeam: PropTypes.object,
    handleLeave: PropTypes.func,
    handleClick: PropTypes.func,
    isRunning: PropTypes.bool,
    numUsers: PropTypes.number,
    isLoading: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    timer: PropTypes.number,
    player: PropTypes.object,
};

export default DraftView;
