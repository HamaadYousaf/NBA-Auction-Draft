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
        <div style={{ backgroundColor: "#EEEEEE", display: "grid" }}>
            {team.map((draftedPlayer) => {
                return (<span key={uuidv4()}>{draftedPlayer}</span>)

            })}
        </div>
    )
}

DraftTeam.propTypes = {
    player: PropTypes.object
};

export default DraftTeam
