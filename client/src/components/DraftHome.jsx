import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getReq } from '../services/draftService';
import { v4 as uuidv4 } from 'uuid'
import useMediaQuery from '@mui/material/useMediaQuery';

const DraftHome = ({ numUsers, handleClick, handleLeave }) => {
    const mobile = useMediaQuery('(min-width:550px)');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setUsers(await getReq('/room/users/names'));
        }

        fetch();
    }, [numUsers])

    return (
        <Container sx={{ mt: 2, px: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", px: 0 }}>
                <Box >
                    <Typography variant={mobile ? ('h4') : ('h5')} color="text.primary">
                        Draft waiting room
                    </Typography>
                    <Typography variant={mobile ? ('h6') : ('h7')} color={'text.secondary'}>
                        Players in draft room: {numUsers}
                    </Typography>

                </Box>
                {mobile ? (
                    <Button variant="contained" onClick={handleLeave} sx={{ ml: 'auto', width: 130, height: 40 }}>
                        Leave Room
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleLeave} sx={{ ml: 'auto', width: 110, height: 30, fontSize: 10 }}>
                        Leave Room
                    </Button>
                )}

            </Box>
            <Box sx={{ display: "inline" }}>
                <Typography variant={mobile ? ('h5') : ('h6')} color="text.primary" sx={{ mt: 2, borderBottom: '1px solid', width: 'max-content', mb: 1 }}>
                    Teams
                </Typography>
                {users.map((user) => (
                    <Typography variant={mobile ? ('h6') : ('h7')} color="text.secondary" key={uuidv4()}>Team {user}</Typography>
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                {numUsers >= 1 ?
                    (
                        mobile ? (
                            <Button variant="contained" onClick={handleClick} sx={{ fontSize: 18, height: 50, width: 200 }}>
                                Start Draft
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleClick} sx={{ fontSize: 14, height: 40, width: 150 }}>
                                Start Draft
                            </Button>
                        )
                    ) : (<></>)}
            </Box>
        </Container>
    )
}

DraftHome.propTypes = {
    handleClick: PropTypes.func,
    handleLeave: PropTypes.func,
    numUsers: PropTypes.number,
};

export default DraftHome
