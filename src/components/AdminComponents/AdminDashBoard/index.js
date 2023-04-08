import "./index.css";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Card from 'react-bootstrap/Card';
import {
    Button, LinearProgress,
} from "@mui/material";
import {Link} from "react-router-dom";
import DashboardUserTable from "../DashboardUserTable";
import DashboardPlaylistsTable from "../DashboardPlaylistsTable";

const AdminDashboard = () => {

    const usersNum = 33;
    const playlistsNum = 10;
    const premiumUsersNum = 5;
    let percent = (premiumUsersNum / usersNum) * 100;
    percent = percent.toFixed(2);

    return (
        <>
            <div className={"m-5 ms-2"}>
                <div className={"mb-5"} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                        <Card.Body>
                            <Card.Title><PersonIcon /><span className={"m-2"}>Regular Users</span>
                                <span className={"float-end"}>{usersNum - premiumUsersNum}</span></Card.Title>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                        <Card.Body>
                            <Card.Title><PersonIcon style={{color:'gold'}}/><span className={"m-2"}>Premium Users</span><span className={"float-end"}>{premiumUsersNum}</span></Card.Title>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                        <Card.Body>
                            <Card.Title><LibraryMusicIcon /><span className={"m-2"}>PlayLists</span><span className={"float-end"}>{playlistsNum}</span></Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                <div style={{width:'50%'}}>
                    <span style={{color:'gold', fontSize:'23px'}} className={"me-5"}><b>Premium Users</b></span>
                    <span><b>{premiumUsersNum}</b></span>
                    <span style={{color:'gray', fontSize:'10px'}} className={"me-5"}>/{usersNum}</span>
                    <span style={{fontSize:'15px'}} className={"ms-5"}>{percent}%</span>
                    <LinearProgress variant="determinate" value={percent} className={"wd-progress-bar"}/>
                </div>
                <div className={"mt-5"}></div>
                <DashboardUserTable/>
                <DashboardPlaylistsTable/>
            </div>
        </>

    );
}
export default AdminDashboard