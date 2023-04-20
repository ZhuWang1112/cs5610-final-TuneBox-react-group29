import Card from "react-bootstrap/Card";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./index.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const SearchCard = ({ item, type }) => {
    const navigate = useNavigate();

    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // change to read currentUser from redux since the info of currentUser may be updated
    const { currentUser } = useSelector((state) => state.user);
    const handleClick = () => {
        if (type === "playlist") {
            localStorage.setItem("DetailSinglePlatlist", JSON.stringify(item))
            navigate("/details/playlist/" + item["data"]["uri"].split(":")[2]);
        } else if (type === "track") {
            localStorage.setItem("DetailSingleTrack", JSON.stringify(item))
            navigate("/details/track/" + item["data"]["uri"].split(":")[2]);
        } else if (type === "artist") {
            localStorage.setItem("DetailSingleArtist", JSON.stringify(item))
            navigate("/details/artist/" + item["data"]["uri"].split(":")[2]);
        } else if (type === "local-artist") {
            localStorage.setItem("LocalDetailSingleArtist", JSON.stringify(item))
            navigate("/details/artist/" + item["_id"]);
        }  else if (type === "local-playlist") {
            localStorage.setItem("LocalDetailSinglePlaylist", JSON.stringify(item))
            navigate("/details/playlist/" + item["_id"]);
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
            >
                {type === "playlist" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item["data"]["images"] &&
                            item["data"]["images"].items &&
                            item["data"]["images"].items[0] &&
                            item["data"]["images"].items[0].sources &&
                            item["data"]["images"].items[0].sources[0] &&
                            item["data"]["images"].items[0].sources[0].url
                                ? item["data"]["images"].items[0].sources[0].url
                                : "./question.png"
                        }
                    />
                )}

                {type === "artist" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                            item["data"]["visuals"] &&
                            item["data"]["visuals"].avatarImage &&
                            item["data"]["visuals"].avatarImage.sources[0] &&
                            item["data"]["visuals"].avatarImage.sources[0].url
                            ? item["data"]["visuals"].avatarImage.sources[0].url
                            : "./question.png"
                        }
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


                <Card.Body>
                    {/*{type === "album" && (*/}
                    {/*    <Card.Title className={"wd-card"}>*/}
                    {/*        <Link to={`details/album/${item.data.name}`} className={"wd-link"}>*/}
                    {/*            {item.data.name}*/}
                    {/*        </Link>*/}
                    {/*    </Card.Title>*/}
                    {/*)}*/}
                    {/*{type === "album" && (*/}
                    {/*    <Card.Text className={"wd-card"}>*/}
                    {/*        <Link to={`details/artist/${item.data.artist["items"][0]["profile"]["name"]}`} className={"wd-link"}>*/}
                    {/*            {item.data.artist["items"][0]["profile"]["name"]}*/}
                    {/*        </Link>*/}
                    {/*        /!*{item.artist}*!/*/}
                    {/*    </Card.Text>*/}
                    {/*)}*/}

                    {type === "playlist" && (
                        <Card.Text className={"wd-card"}>
                            {item.data.name}
                            {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                            {/*    {item.user.userName}*/}
                            {/*</Link>*/}
                        </Card.Text>
                    )}

                    {type === "local-artist" && (
                        <Card.Title className={"wd-card"}>{item.playListName}</Card.Title>
                    )}

                    {/*{type === "playlist" && (*/}
                    {/*    <Card.Text className={"wd-card"}>{item.description}</Card.Text>*/}
                    {/*)}*/}
                    {/*{type === "playlist" && (*/}
                    {/*    <Card.Title className={"wd-card"}>*/}
                    {/*        Rating: {item.rating.toFixed(2)}*/}
                    {/*    </Card.Title>*/}
                    {/*)}*/}

                    {/*{type === "user" && (*/}
                    {/*    <Card.Title className={"wd-card"}>*/}
                    {/*        <Link*/}
                    {/*            className={"wd-link"}*/}
                    {/*            to={*/}
                    {/*                currentUser !== null && item._id === currentUser._id*/}
                    {/*                    ? `/profile`*/}
                    {/*                    : `/profile/${item._id}`*/}
                    {/*            }*/}
                    {/*        >*/}
                    {/*            {item.userName}*/}
                    {/*        </Link>*/}
                    {/*    </Card.Title>*/}
                    {/*)}*/}

                    {type === "artist" && (
                        <Card.Title className={"wd-card"}>{item.data.profile.name}</Card.Title>
                    )}

                    {type === "local-artist" && (
                        <Card.Title className={"wd-card"}>{item.name}</Card.Title>
                    )}

                    {type === "track" && (
                        <Card.Title className={"wd-card"}>{item.data.name}</Card.Title>
                    )}


                {/*    {type === "track" && (*/}
                {/*        <>*/}
                {/*            /!* <Card.Title className={"wd-card"}>{item.songName}</Card.Title>*/}
                {/*<Card.Text className={"wd-card"}>{item.artist}</Card.Text> *!/*/}
                {/*            <Card.Title className={"wd-card"}>songName</Card.Title>*/}
                {/*            <Card.Text className={"wd-card"}>artist</Card.Text>*/}
                {/*        </>*/}
                {/*    )}*/}
                </Card.Body>
            </Card>
        </div>
    );
};
export default SearchCard;