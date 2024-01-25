import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Feed = ({ feed }) => {
    const mobile = useMediaQuery('(min-width:400px)');
    const fontSize = mobile ? (14) : (12);

    return (
        <Paper elevation={1}>
            <Stack spacing={0.5} sx={{ fontSize: { fontSize }, height: '60vh', overflowY: "scroll" }}>
                <Box sx={{ display: 'flex', justifyContent: "space-between", fontWeight: "bold", bgcolor: "#eeeeee" }} key={uuidv4()}>
                    <span style={{ width: 250, whiteSpace: 'pre-wrap' }}>Welcome to the draft room</span>
                </Box>
                {
                    feed.map((log) => {
                        const index = feed.indexOf(log)
                        let view = '';
                        index % 2 ? (
                            view = <Box sx={{ display: 'flex', justifyContent: "space-between", bgcolor: "#eeeeee" }} key={uuidv4()}>
                                <span style={{ width: 250, whiteSpace: 'pre-wrap' }}>{log.msg}</span>
                                <span style={{ whiteSpace: 'nowrap' }}>{log.time}</span>
                            </Box>

                        ) : (
                            view = <Box sx={{ display: 'flex', justifyContent: "space-between" }} key={uuidv4()}>
                                <span style={{ width: 250, whiteSpace: 'pre-wrap' }}>{log.msg}</span>
                                <span style={{ whiteSpace: 'nowrap' }}>{log.time}</span>
                            </Box>
                        )
                        return view
                    })
                }
            </Stack>
        </Paper>
    )
}

Feed.propTypes = {
    feed: PropTypes.array,
};

export default Feed
