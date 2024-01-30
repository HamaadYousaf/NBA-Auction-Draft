import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';

const Player = ({ timer, player }) => {
    const mobile = useMediaQuery('(min-width:500px)');

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'right', ml: '80%' }}>
                <Typography variant={mobile ? ('h3') : ('h4')}>{timer}</Typography>
            </Box>
            <Container sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
                    <ImageList sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ImageListItem key={player.name} >
                            <img
                                src={player.image}
                                alt={player.name}
                                style={{ width: mobile ? (300) : (200) }}
                            />
                        </ImageListItem>
                    </ImageList>
                    <Typography variant={mobile ? ('h4') : ('h5')} sx={{ mb: 1 }}>{player.name}</Typography>
                    <Typography variant={mobile ? ('h5') : ('h6')} color='text.secondary'>{player.team}</Typography>
                    <Typography variant={mobile ? ('h5') : ('h6')} color='text.secondary'>{player.pos}</Typography>
                </Box>
            </Container >
        </Container>
    )
}

Player.propTypes = {
    isLoading: PropTypes.bool,
    timer: PropTypes.number,
    player: PropTypes.object
};

export default Player
