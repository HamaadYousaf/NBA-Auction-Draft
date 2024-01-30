import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getReq } from '../services/draftService';

const Bid = ({ socket, user, currBid, currBidder, player }) => {
    const mobile = useMediaQuery('(min-width:500px)');

    const [bidAmount, setBidAmount] = useState();
    const [bid, setBid] = useState(currBid);

    useEffect(() => {
        setBid(currBid);
    }, [currBid]);

    useEffect(() => {
        const fetch = async () => {
            setBidAmount(await getReq('/user/bidAmount'));
        }

        fetch();
    }, [player]);

    const handleClick = (amount) => {
        const newBid = bid + amount;
        if (bidAmount - newBid >= 0) {
            setBid(newBid);
        }
    }

    const handleBid = () => {
        if (bidAmount - bid >= 0 && bid > currBid) {
            socket.emit('bid', user, bid);
        }
    }

    return (
        <Container sx={{ textAlign: 'center', mt: { xs: 1, sm: 5 } }}>
            <Typography variant={mobile ? ('h5') : ('h6')} sx={{ mb: 1 }}>Current Bid:</Typography>
            <Typography variant={mobile ? ('h4') : ('h5')} >{currBid}</Typography>
            <Typography variant={mobile ? ('h6') : ('h7')} color='text.secondary'>{currBidder}</Typography>
            <Box
                sx={{
                    display: 'flex', justifyContent: { xs: 'space-between', sm: 'space-evenly' },
                    alignItems: 'center', mt: { xs: 4, sm: 10 }, mb: { xs: 1, sm: 2 }
                }}>
                <Box>
                    <Typography variant={mobile ? ('h5') : ('h6')} sx={{ mb: 1 }}>Available:</Typography>
                    <Typography variant={mobile ? ('h4') : ('h5')}>${bidAmount}</Typography>
                </Box>
                <Box sx={{ display: 'inline-block', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant={mobile ? ('h5') : ('h6')}>${bid}</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => handleClick(5)}
                            disabled={currBid + 5 <= bidAmount ? (false) : (true)}
                            sx={{ height: 40, width: { xs: 40, sm: 80 }, fontSize: { xs: 16, sm: 20 }, mr: { xs: 1, sm: 3 } }}
                        >
                            $5
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleClick(10)}
                            disabled={currBid + 10 <= bidAmount ? (false) : (true)}
                            sx={{
                                height: 40, width: { xs: 40, sm: 80 }, fontSize: { xs: 16, sm: 20 }, ml: { xs: 1, sm: 3 }
                            }}
                        >
                            $10
                        </Button>
                    </Box>
                    <Button
                        variant='contained'
                        sx={{ height: 35, width: { xs: 150, sm: 208 }, fontSize: { xs: 16, sm: 18 }, mt: 2 }}
                        onClick={handleBid}
                    >
                        Bid
                    </Button>
                </Box>
            </Box>
        </Container >
    )
}

Bid.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.string,
    currBid: PropTypes.number,
    currBidder: PropTypes.string,
    player: PropTypes.object
};

export default Bid
