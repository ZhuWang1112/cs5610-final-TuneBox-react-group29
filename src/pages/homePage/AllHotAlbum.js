import {useDispatch, useSelector} from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import HomeCard from "../../components/HomeCard";
import React, {useEffect} from "react";
import {hotAlbumThunk, hotArtistThunk} from "../../services/thunks/hot-thunk";

const AllHotAlbum = () => {
    const {albums} = useSelector((state) => state.hot);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Call useHistory hook

    useEffect(() => {
        if (albums.length === 0) {
            dispatch(hotAlbumThunk());
        }
    }, []);
    const handleBackClick = () => {
        navigate(-1); // Navigate back on arrow click
    };

    return (
        <div className={"m-2"}>
            <div  className={"text-white"} style={{display: 'flex', alignItems: 'center'}}>
                <ArrowBackIcon onClick={handleBackClick} />
                <h2 className={"ms-2"} style={{color: "gold"}}>Top Albums</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {albums.map((album) => (
                    <div key={album.rank} style={{ flex: '1 0 16.666%', maxWidth: '16.666%' }}>
                        <HomeCard item={album} type={"album"} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AllHotAlbum;