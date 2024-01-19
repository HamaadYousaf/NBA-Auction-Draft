import { useEffect, useState } from "react";
import { getReq } from "../services/draftService";
import { v4 as uuidv4 } from 'uuid';

const DisplayTeams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {

        const fetch = async () => {
            setTeams(await getReq('/user/team'));
        }
        fetch();
    }, [])

    return (
        <div style={{ backgroundColor: "#EEEEEE", display: "grid" }}>
            <ol>
                {teams.map((team) => {
                    if (team.length === 0) {
                        return;
                    }
                    return (
                        <li key={uuidv4()}>
                            <hr></hr>
                            {team.map((player) => {
                                return (
                                    <div key={uuidv4()}>
                                        <span>{player.name}</span>
                                    </div>
                                )
                            })}
                        </li>
                    )
                })
                }
            </ol>
        </div>
    )
}

export default DisplayTeams
