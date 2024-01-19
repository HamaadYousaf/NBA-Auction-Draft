import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getReq } from '../services/draftService';

const Bid = ({ socket, user, currBid, currBidder, player }) => {
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
        <div >
            <div>
                <span>Your bidding amount: {bidAmount}&nbsp;&nbsp;&nbsp;</span>
                <span>Current Bidder: {currBidder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Current Bid: {currBid}</span>
            </div>
            <span>Bid</span>
            {currBid + 5 <= bidAmount ? (
                <>
                    <button onClick={() => handleClick(5)}>$5</button>
                </>
            ) : (
                <>
                    <button onClick={() => handleClick(5)} disabled={true}>$5</button>
                </>
            )}
            {currBid + 10 <= bidAmount ? (
                <>
                    <button onClick={() => handleClick(10)}>$10</button>
                </>
            ) : (
                <>
                    <button onClick={() => handleClick(10)} disabled={true}>$10</button>
                </>
            )}
        </div>
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
