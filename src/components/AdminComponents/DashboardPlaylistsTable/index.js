import {
    Button,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { Box, useTheme } from "@mui/material";
import {Link} from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import {useEffect, useState} from "react";
import {findLatestPlaylists} from "../services";

const DashboardPlaylistsTable = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const latestPlaylists = await findLatestPlaylists();
            setRows(latestPlaylists);
        }
        fetchData();

    },[]);

    return (
        <div className={"mb-5"}>
            <h4 style={{ color: "white" }}>
                <LibraryMusicIcon /> Recent Playlists
            </h4>
            <div>
                <Box maxWidth="100%">
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="center" >Creator</StyledTableCell>
                                    <StyledTableCell align="center" >songs</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.playListName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" >{row.user.userName}</StyledTableCell>
                                        <StyledTableCell align="center" >{row.songs.length}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
            <div>
                <Link to="/admin/playlists" className={"float-end"}>
                    <Button variant="contained" color="primary">View More</Button>
                </Link>
            </div>
        </div>
    );
}

export default DashboardPlaylistsTable;