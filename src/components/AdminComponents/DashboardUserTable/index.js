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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const DashboardUserTable = () => {

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
            username: "John",
            email: "john@example.com",
            gender: "Male",
            playlistsCount: 3
        },
        {
            username: "Mary",
            email: "mary@example.com",
            gender: "Female",
            playlistsCount: 2
        },
        {
            username: "Bob",
            email: "bob@example.com",
            gender: "Male",
            playlistsCount: 4
        },
        {
            username: "Lisa",
            email: "lisa@example.com",
            gender: "Female",
            playlistsCount: 1
        }
    ];
    return (
        <div className={"mb-5"}>
            <h4 style={{color:"white"}}><PeopleAltIcon /> Recent Users</h4>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">UserName</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Gender</StyledTableCell>
                                <StyledTableCell align="center">playlistsCount</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.username}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.gender}</StyledTableCell>
                                    <StyledTableCell align="center">{row.playlistsCount}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <Link to="/admin/users" className={"float-end mb-5"}>
                    <Button variant="contained" color="primary">View More</Button>
                </Link>
            </div>

        </div>

    );
}
export default DashboardUserTable;