import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from "react";
import { getReq } from "../services/draftService";
import { v4 as uuidv4 } from 'uuid';

const DisplayTeams = () => {
    const [teams, setTeams] = useState([[]]);
    const [teamNum, setTeamNum] = useState(0);

    useEffect(() => {

        const fetch = async () => {
            setTeams(await getReq('/user/team'));
        }
        fetch();
    }, [])

    const handleChange = (event) => {
        setTeamNum(event.target.value);
    };

    return (
        <div>
            {
                teams.length != 0 ? (
                    <Box sx={{ minWidth: 120, mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel >Team</InputLabel>
                            <Select
                                value={teamNum}
                                label="Team"
                                onChange={handleChange}
                                sx={{ width: "120px" }}
                            >
                                {
                                    teams.map((row) => {
                                        let num = teams.indexOf(row);
                                        return (
                                            <MenuItem value={num} key={uuidv4()}>Team {num + 1}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                ) : (<></>)
            }

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead >
                        <TableRow sx={{ bgcolor: '#f8fafb' }} >
                            <TableCell sx={{ width: '10%', fontWeight: "bold" }}>Player</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Team</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            teams.length != 0 ? (
                                teams[teamNum].map((row) => (
                                    <TableRow
                                        key={uuidv4()}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <ImageList sx={{ width: { xs: 200, sm: 300 } }}>
                                                <ImageListItem key={row.image}>
                                                    <img
                                                        src={row.image}
                                                        alt={row.name}
                                                    />
                                                </ImageListItem>
                                            </ImageList>
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.team}</TableCell>
                                        <TableCell align="center">{row.pos}</TableCell>
                                    </TableRow>
                                ))
                            ) : (<></>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default DisplayTeams
