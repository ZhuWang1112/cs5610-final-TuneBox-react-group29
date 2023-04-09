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
import {Link} from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
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

    const rows = [
        {
            name: "My Playlist 1",
            creator: "John",
            songs: 10
        },
        {
            name: "My Playlist 2",
            creator: "Mary",
            songs: 5
        },
        {
            name: "My Playlist 3",
            creator: "Bob",
            songs: 15
        },
        {
            name: "My Playlist 4",
            creator: "Lisa",
            songs: 7
        }
    ];

    return (
        <div className={"mb-5"}>
            <h4 style={{color:"white"}}><LibraryMusicIcon /> Recent Playlists</h4>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Creator</StyledTableCell>
                                <StyledTableCell align="center">songs</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.creator}</StyledTableCell>
                                    <StyledTableCell align="center">{row.songs}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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