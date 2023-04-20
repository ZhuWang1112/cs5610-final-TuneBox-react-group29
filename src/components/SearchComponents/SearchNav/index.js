import "./index.css";
import {useLocation} from "react-router";
const SearchNav = () => {
    const { pathname } = useLocation();
    const paths = pathname.split("/");
    const active = paths[2];
    // console.log("what???", active)
    return (
        <>
            <ul className="nav nav-pills pb-1">
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/search/search-remote-albums"><span className={`${active === 'search-remote-albums' ? 'wd-active' : ''}`}>Cloud Albums</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/search/search-remote-artists"><span className={`${active === 'search-remote-artists' ? 'wd-active' : ''}`}>Cloud Artists</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/search/search-remote-tracks"><span className={`${active === 'search-remote-tracks' ? 'wd-active' : ''}`}>Cloud Tracks</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/search/search-local-playlists"><span className={`${active === 'search-local-playlists' ? 'wd-active' : ''}`}>Local Playlists</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/search/search-local-artists"><span className={`${active === 'search-local-artists' ? 'wd-active' : ''}`}>Local Artists</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link wd-nav" href="/search/search-local-songs"><span className={`${active === 'search-local-songs' ? 'wd-active' : ''}`}>Local Songs</span></a>
                </li>
            </ul>
        </>
    );
}
export default SearchNav;