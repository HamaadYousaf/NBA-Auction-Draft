import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Feed = ({ feed }) => {
    return (
        <div style={{ backgroundColor: "#EEEEEE", display: "grid" }}>
            {
                feed.map((log) => {
                    return (<span key={uuidv4()}>{log.msg}&nbsp;&nbsp;{log.time}</span>)
                })
            }
        </div>
    )
}

Feed.propTypes = {
    feed: PropTypes.array,
};

export default Feed
