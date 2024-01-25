import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { getReq } from "../services/draftService.js";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const DraftTeam = ({ player }) => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        let placeholderTeam = ["Empty", "Empty", "Empty", "Empty", "Empty"];

        const fetch = async () => {
            let currTeam = await getReq('/user/player');

            for (let i = 0; i < currTeam.length; i++) {
                placeholderTeam[i] = currTeam[i].name;
            }
            setTeam(placeholderTeam);
        }

        fetch();
    }, [player]);

    return (
        <Box >
            <Stack>
                <Paper elevation={3} sx={{ width: '100%', borderRadius: 0, textAlign: "center", py: 1, fontSize: 18, fontWeight: 'bold' }}>
                    Your Team
                </Paper>
                {
                    team.map((draftedPlayer) => {
                        return (<Paper elevation={3} sx={{ width: '100%', borderRadius: 0, textAlign: "center", py: 1 }} key={uuidv4()}>{draftedPlayer}</Paper>)

                    })
                }
            </Stack>
        </Box >
    )
}

DraftTeam.propTypes = {
    player: PropTypes.object
};

export default DraftTeam
