import PropTypes from 'prop-types';

const Bid = ({ socket, user, currBid, currBidder }) => {

    const handleClick = (amount) => {
        const newBid = currBid + amount;
        socket.emit('bid', user, newBid);
    }

    return (
        <div >
            <div>
                <span>Current Bidder: {currBidder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>Current Bid: {currBid}</span>
            </div>
            <span>Bid</span>
            <button onClick={() => handleClick(5)}>$5</button>
            <button onClick={() => handleClick(10)}>$10</button>
        </div>
    )
}

Bid.propTypes = {
    socket: PropTypes.object,
    user: PropTypes.string,
    currBid: PropTypes.number,
    currBidder: PropTypes.string
};

export default Bid
