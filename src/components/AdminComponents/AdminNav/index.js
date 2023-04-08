import "./index.css";
import {useLocation} from "react-router";
const AdminNav = () => {
    const { pathname } = useLocation();
    const paths = pathname.split("/");
    const active = paths[2];
    return (
        <>
            <ul className="nav nav-pills pb-1">
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/admin/dashboard"><span className={`${active === 'dashboard' ? 'wd-active' : ''}`}>Dashboard</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/admin/users"><span className={`${active === 'users' ? 'wd-active' : ''}`}>Users</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/admin/playlists"><span className={`${active === 'playlists' ? 'wd-active' : ''}`}>Playlists</span></a>
                </li>
            </ul>
        </>
    );
}
export default AdminNav;