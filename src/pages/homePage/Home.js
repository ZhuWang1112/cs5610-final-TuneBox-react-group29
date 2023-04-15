import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {hotAlbumThunk, hotArtistThunk, hotPlaylistThunk, hotUserThunk} from '../../services/thunks/hot-thunk';
import HomeCard from '../../components/HomeCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {Link} from "react-router-dom";
import UpgradeBanner from "../../components/UpgradeBanner";

const Home = () => {
    const {artists} = useSelector((state) => state.hot);
    const {albums} = useSelector((state) => state.hot);
    const {playlists} = useSelector((state) => state.hot);
    const {users} = useSelector((state) => state.hot);
    const {error} = useSelector((state) => state.hot);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hotArtistThunk());
        dispatch(hotAlbumThunk());
        dispatch(hotPlaylistThunk());
        dispatch(hotUserThunk());
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    let num = Math.floor(windowWidth / 250);


    const displayArtists = artists.slice(0, num);
    const displayAlbum = albums.slice(0, num);
    return (
        <div className={"m-2"}>
            {error && <UpgradeBanner/>}
            {!error && <div>
                <div  className={"text-white"} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 className={"mb-2"} style={{color: "gold"}}>Recommended Artists</h2>
                    {/*<p>current window width：{num}px</p>*/}
                    <div>
                        <ArrowRightAltIcon />
                        <Link to={"/hot/artist/all"} className={"m-3"}>View More</Link>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {displayArtists.map((artist) => (
                        <div key={artist.rank} style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}>
                            <HomeCard item={artist} type={"artist"}/>
                        </div>
                    ))}
                </div>

                <div  className={"text-white mt-5"} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 className={"mb-2"} style={{color: "gold"}}>Recommended Album</h2>
                    <div>
                        <ArrowRightAltIcon />
                        <Link to={"/hot/album/all"} className={"m-3"}>View More</Link>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {displayAlbum.map((album) => (
                        <div key={album.rank} style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}>
                            <HomeCard item={album} type={"album"}/>
                        </div>
                    ))}
                </div>
            </div>}

            <div  className={"text-white mt-5"} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 className={"mb-2"} >Recommended Playlists</h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {playlists.map((playlist) => (
                    <div key={playlist._id} style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}>
                        <HomeCard item={playlist} type={"playlist"}/>
                    </div>
                ))}
            </div>

            <div  className={"text-white mt-5"} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 className={"mb-2"} >Recommended Follows</h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {users.map((user) => (
                    <div key={user._id} style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}>
                        <HomeCard item={user} type={"user"}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
