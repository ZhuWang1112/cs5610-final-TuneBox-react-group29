import "./index.css";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Card from 'react-bootstrap/Card';
import {
    Button, LinearProgress,
} from "@mui/material";
import DashboardUserTable from "../DashboardUserTable";
import DashboardPlaylistsTable from "../DashboardPlaylistsTable";
import {useEffect, useState} from "react";
import axios from "axios";
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const API_BASE = 'http://localhost:4000/api';

const AdminDashboard = () => {

    const [usersNum, setUsersNum] = useState(0);
    const [playlistsNum, setPlaylistsNum] = useState(0);
    const [premiumUsersNum, setPremiumUsersNum] = useState(0);
    const [femaleUsersNum, setFemaleUsersNum] = useState(0);
    const [maleUsersNum, setMaleUsersNum] = useState(0);


    useEffect(() => {
        axios.get(`${API_BASE}/users/admin/count`)
            .then(response => {
                setUsersNum(response.data);
            }).catch(error => {
                console.error(error);
            });
        axios.get(`${API_BASE}/playlists/admin/count`)
            .then(response => {
                setPlaylistsNum(response.data);
            }).catch(error => {
            console.error(error);
        });
        axios.get(`${API_BASE}/users/admin/vip/count`)
            .then(response => {
                setPremiumUsersNum(response.data);
            }).catch(error => {
            console.error(error);
        });
        axios.get(`${API_BASE}/users/admin/female/count`)
            .then(response => {
                setFemaleUsersNum(response.data);
            }).catch(error => {
            console.error(error);
        });
        axios.get(`${API_BASE}/users/admin/male/count`)
            .then(response => {
                setMaleUsersNum(response.data);
            }).catch(error => {
            console.error(error);
        });

    },[]);

    let percent = (premiumUsersNum / usersNum) * 100;
    let nonBinaryUsersNum = usersNum - (femaleUsersNum + maleUsersNum);
    percent = percent.toFixed(2);

    const doughnutChartData = {
        labels: ["Female Users", "Male Users", "Non-Binary Users"],
        datasets: [
            {
                data: [femaleUsersNum, maleUsersNum, nonBinaryUsersNum],
                backgroundColor: ["#FF6384", "#36A2EB", "#28A745"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#28A745"],
            },
        ],
    };

    const doughnutChartOptions = {
        aspectRatio: 2, // width / height
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b);
                        const percentage = ((value / total) * 100).toFixed(2) + '%';
                        return label + ': ' + value + ' (' + percentage + ')';
                    },
                },
            },
        },
    };

    return (
        <>
            <div className="m-5 ms-2">
                <div className={"mb-5"} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                        <Card.Body>
                            <Card.Title><PersonIcon /><span className={"m-2"}>Regular Users</span>
                                <span className={"float-end"}>{usersNum - premiumUsersNum}</span></Card.Title>
                        </Card.Body>
                    </Card>

                    <Card className={"d-none d-md-block"} style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                        <Card.Body>
                            <Card.Title><PersonIcon style={{color:'gold'}}/><span className={"m-2"}>Premium Users</span><span className={"float-end"}>{premiumUsersNum}</span></Card.Title>
                        </Card.Body>
                    </Card>

                    <Card  className={"d-none d-lg-block"} style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'}}>
                        <Card.Body>
                            <Card.Title><LibraryMusicIcon /><span className={"m-2"}>PlayLists</span><span className={"float-end"}>{playlistsNum}</span></Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                <div className={"mb-5"} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={"d-none d-sm-block"} style={{width:'50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <span style={{color:'gold', fontSize:'23px'}} className={"me-5"}><b>Premium Users</b></span>
                            <span style={{color:"white"}}><b>{premiumUsersNum}</b></span>
                            <span style={{color:'gray', fontSize:'10px'}} className={"me-5"}>/{usersNum}</span>
                            <span style={{fontSize:'15px', color:"white"}} className={"ms-5"}>{percent}%</span>
                            <LinearProgress variant="determinate" value={percent} className={"wd-progress-bar"}/>
                        </div>
                    </div>
                    {/*chart*/}
                    <div  className={"d-none d-lg-block"} style={{width:'50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                    </div>
                </div>
                <div className="mt-5"></div>
                <DashboardUserTable />
                <DashboardPlaylistsTable />
            </div>
        </>


    );
}
export default AdminDashboard