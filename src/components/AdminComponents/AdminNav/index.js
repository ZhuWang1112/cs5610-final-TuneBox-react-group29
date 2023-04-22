import "./index.css";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
const AdminNav = () => {
    const { pathname } = useLocation();
    const paths = pathname.split("/");
    const active = paths[2];
    return (
        <>
            <ul className="nav nav-pills pb-1">
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/admin/dashboard"><span className={`${active === 'dashboard' ? 'wd-active' : ''}`}>Dashboard</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/admin/users"><span className={`${active === 'users' ? 'wd-active' : ''}`}>Users</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/admin/playlists"><span className={`${active === 'playlists' ? 'wd-active' : ''}`}>Playlists</span></Link>
                </li>
            </ul>
        </>
    );
}
export default AdminNav;