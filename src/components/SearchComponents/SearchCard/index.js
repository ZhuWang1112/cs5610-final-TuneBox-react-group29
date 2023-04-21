import Card from "react-bootstrap/Card";
import "./index.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {changeTrack, updateIsPlaying} from "../../../reducers/currentTrack-reducer";
import {getTrackThunk} from "../../../services/thunks/track-thunk";
import {BsFillPauseCircleFill, BsFillPlayCircleFill} from "react-icons/bs";
import React, {useState} from "react";
import {AiFillHeart, AiFillPlayCircle} from "react-icons/ai";

const SearchCard = ({item, type}) => {
    const navigate = useNavigate();
    // change to read currentUser from redux since the info of currentUser may be updated
    const {currentUser} = useSelector((state) => state.user);
    // playing status -- boolean
    const isPlaying = useSelector((state) => state.currentTrack.isPlaying);
    // current song
    const track = useSelector((state) => state.currentTrack.track);
    const dispatch = useDispatch();
    // const [like, setLike] = useState(isLike);
    const [isHovering, setIsHovering] = useState(false);
    const iconSize = 25;

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    // change route to details page
    const handleClick = () => {
        if (type === "album") {
            navigate("/details/album/" + item.apiAlbumId, {
                state: {title: item.title},
            });
        } else if (type === "artist") {
            navigate("/details/artist/" + item.apiArtistId, {
                state: {item},
            });
        } else if (type === "local-artist") {
            localStorage.setItem("LocalDetailSingleArtist", JSON.stringify(item))
            navigate("/artist/details/" + item["_id"]);
        } else if (type === "local-playlist") {
            localStorage.setItem("LocalDetailSinglePlaylist", JSON.stringify(item))
            navigate("/details/playlist/" + item["_id"]);
        }
    };

    //play musics online: track is cloud, local-song is from DB
    const handlePlay = () => {
        if (type === "track") {
            // console.log("track-card: ", item)
            const newItem = item.data;
            // newItem._id = newItem.id;
            newItem.apiSongId = newItem.id;
            if (track.apiSongId === newItem.apiSongId) {
                dispatch(updateIsPlaying(!isPlaying));
            } else {
                // console.log("song!!! ", newItem)
                dispatch(changeTrack(newItem));
            }
        } else if (type === "local-song") {
            // console.log("local-song-card: ", item)
            const newItem = item;
            if (track.apiSongId === newItem._id) {
                dispatch(updateIsPlaying(!isPlaying));
            } else {
                // console.log("song!!! ", newItem)
                dispatch(changeTrack(newItem));
            }
        }

    };

    return (
        <div className={"m-2"}>
            <Card
                className="wd-card-container wd-card-content"
                style={{
                    width: "10rem",
                }}
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {isHovering && type === "track" && (
                    <AiFillPlayCircle
                        className={`position-absolute song-play-icon text-dark`}
                        size={40}
                        onClick={() => handlePlay()}
                    />
                )}

                {isHovering && type === "local-song" && (
                    <AiFillPlayCircle
                        className={`position-absolute song-play-icon text-dark`}
                        size={40}
                        onClick={() => handlePlay()}
                    />
                )}


                {type === "album" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item.img
                        }
                    />
                )}

                {type === "artist" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={item.img === "" ? "./question.png" : item.img}
                    />
                )}

                {type === "track" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item["data"]["albumOfTrack"] &&
                            item["data"]["albumOfTrack"]["coverArt"] &&
                            item["data"]["albumOfTrack"]["coverArt"].sources[0] &&
                            item["data"]["albumOfTrack"]["coverArt"].sources[0].url
                                ? item["data"]["albumOfTrack"]["coverArt"].sources[0].url
                                : "./question.png"
                        }
                    />
                )}

                {type === "local-artist" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item["img"] ? item["img"] : "./question.png"
                        }
                    />
                )}

                {type === "local-playlist" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item["img"] ? item["img"] : "./question.png"
                        }
                    />
                )}

                {type === "local-song" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item["img"] ? item["img"] : "./question.png"
                        }
                    />
                )}


                <Card.Body>


                    {type === "album" && (
                        <Card.Title className={"wd-card"}>
                            {item.title}
                        </Card.Title>
                    )}

                    {type === "playlist" && (
                        <Card.Text className={"wd-card"}>
                            {item.data.name}
                        </Card.Text>
                    )}


                    {type === "local-playlist" && (
                        <Card.Title className={"wd-card"}>{item.playListName}</Card.Title>
                    )}

                    {type === "local-song" && (
                        <Card.Title className={"wd-card"}>{item.songName}</Card.Title>
                    )}


                    {type === "album" && (
                        <Card.Text className={"wd-card"}>
                            <Link
                                to={`/details/artist/${item.apiArtistId}`}
                                className={"wd-link"}
                            >
                                {item.artistName}
                            </Link>
                            {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                            {/*    {item.user.userName}*/}
                            {/*</Link>*/}
                        </Card.Text>
                    )}


                    {type === "album" && (
                        <Card.Text className={"wd-card"}>
                            <Link
                                to={`/details/artist/${item.apiArtistId}`}
                                className={"wd-link"}
                            >
                                {item.artistName}
                            </Link>

                        </Card.Text>
                    )}

                    {type === "album" && (
                        <Card.Text className={"wd-card"}>
                            {item.date}
                        </Card.Text>
                    )}


                    {type === "local-artist" && (
                        <Card.Title className={"wd-card"}>{item.name}</Card.Title>
                    )}

                    {type === "local-song" && (
                        <Card.Text className={"wd-card"}>
                            {item.artistName}
                            {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                            {/*    {item.user.userName}*/}
                            {/*</Link>*/}
                        </Card.Text>
                    )}


                    {type === "local-song" && (
                        <Card.Text className={"wd-card"}>
                            {item.artistName}
                        </Card.Text>
                    )}
                    {type === "artist" && (
                        <Card.Title className={"wd-card"}>{item.artistName}</Card.Title>
                    )}


                </Card.Body>
                {type === "local-song" && (
                    <AiFillHeart
                        size={iconSize}
                        className={`text-danger`}
                        onClick={() => {
                            //reference: DetailItem
                            // setLike(false);
                            // handleUnLikeClick(song);
                        }}
                    />
                )}

                {type === "track" && (
                    <AiFillHeart
                        size={iconSize}
                        className={`text-danger`}
                        onClick={() => {
                            // setLike(false);
                            // handleUnLikeClick(song);
                        }}
                    />
                )}
            </Card>
        </div>
    );
};
export default SearchCard;