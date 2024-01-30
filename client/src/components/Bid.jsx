import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useEffect, useState } from 'react';
import { getReq } from '../services/draftService';

const Bid = ({ socket, user, currBid, currBidder, player }) => {
    const mobile = useMediaQuery('(min-width:500px)');

    const [bidAmount, setBidAmount] = useState();

    useEffect(() => {
        const fetch = async () => {
            setBidAmount(await getReq('/user/bidAmount'));
        }

        fetch();
    }, [player]);

    const handleClick = (amount) => {
        const newBid = currBid + amount;
        if (bidAmount - newBid >= 0) {
            socket.emit('bid', user, newBid);
        }
    }

    return (
        <Container sx={{ textAlign: 'center', mt: { xs: 1, sm: 5 } }}>
            <Typography variant={mobile ? ('h5') : ('h6')} sx={{ mb: 1 }}>Current Bid:</Typography>
            <Typography variant={mobile ? ('h4') : ('h5')} >{currBid}</Typography>
            <Typography variant={mobile ? ('h6') : ('h7')} color='text.secondary'>{currBidder}</Typography>
            <Typography variant={mobile ? ('h4') : ('h5')} sx={{ mt: { xs: 4, sm: 10 }, mb: { xs: 1, sm: 2 } }}>${bidAmount}</Typography>
            <Button
                variant="outlined"
                onClick={() => handleClick(5)}
                disabled={currBid + 5 <= bidAmount ? (false) : (true)}
                sx={{ height: 50, width: 100, fontSize: 20, mr: 5 }}
            >
                $5
            </Button>
            <Button
                variant="outlined"
                onClick={() => handleClick(10)}
                disabled={currBid + 10 <= bidAmount ? (false) : (true)}
                sx={{ height: 50, width: 100, fontSize: 20, ml: 5 }}
            >
                $10
            </Button>
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
