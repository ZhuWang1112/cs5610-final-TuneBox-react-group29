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
import {useEffect, useState} from "react";
import {findLatestUsers} from "../services";
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

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await findLatestUsers();
            setRows(response.reverse());
        }
        fetchData();
    },[]);

    return (
        <div className={"mb-5"}>
            <h4 style={{color:"white"}}><PeopleAltIcon /> Recent Users</h4>
            <div className="table-responsive">
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">UserName</StyledTableCell>
                                <StyledTableCell align="center" className="d-none d-lg-table-cell">Email</StyledTableCell>
                                <StyledTableCell align="center" >Gender</StyledTableCell>
                                <StyledTableCell align="center" className="d-none d-md-table-cell">playlistsCount</StyledTableCell>
                                <StyledTableCell align="center" className="d-none d-lg-table-cell">Join Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.userName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" className="d-none d-lg-table-cell">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center" >{row.gender}</StyledTableCell>
                                    <StyledTableCell align="center" className="d-none d-md-table-cell">{row.playlistsCount}</StyledTableCell>
                                    <StyledTableCell align="center" className="d-none d-lg-table-cell">{row.createTime}</StyledTableCell>
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