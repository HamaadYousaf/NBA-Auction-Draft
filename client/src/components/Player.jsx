import PropTypes from 'prop-types';

const Player = ({ isLoading, timer, player }) => {
    return (
        <div>
            <span>Timer = {isLoading ? (<>...</>) : (<>{timer}</>)}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {player.image === '...' ?
                (
                    <>
                        <span>...</span>
                    </>
                ) : (
                    <>
                        <span><img src={player.image} alt={player.name}></img></span>
                    </>
                )}
            <span>Player: {isLoading ? (<>...</>) : (<>{player.name}</>)}&nbsp;&nbsp;&nbsp;</span>
            <span>
                Team: {isLoading ? (<>...</>) : (<>{player.team}</>)}&nbsp;
                Position: {isLoading ? (<>...</>) : (<>{player.pos}</>)}&nbsp;
            </span>
        </div>
    )
}

Player.propTypes = {
    isLoading: PropTypes.bool,
    timer: PropTypes.number,
    player: PropTypes.object
};

export default Player
