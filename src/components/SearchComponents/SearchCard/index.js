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
        if (type === "album") {
            // localStorage.setItem("DetailSinglePlatlist", JSON.stringify(item))
            navigate("/details/album/" + item.apiAlbumId);
        } else if (type === "track") {
            localStorage.setItem("DetailSingleTrack", JSON.stringify(item))
            navigate("/details/track/" + item["data"]["uri"].split(":")[2]);
        } else if (type === "artist") {
            localStorage.setItem("DetailSingleArtist", JSON.stringify(item))
            navigate("/details/artist/" + item["data"]["uri"].split(":")[2]);
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
                {type === "album" && (
                    <Card.Img
                        variant="top"
                        className={"wd-card-img-custom "}
                        src={
                        item.img
                            // item["data"]["images"] &&
                            // item["data"]["images"].items &&
                            // item["data"]["images"].items[0] &&
                            // item["data"]["images"].items[0].sources &&
                            // item["data"]["images"].items[0].sources[0] &&
                            // item["data"]["images"].items[0].sources[0].url
                            //     ? item["data"]["images"].items[0].sources[0].url
                            //     : "./question.png"
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

          {/*<div className="wd-play-button">*/}
          {/*    <PlayArrowIcon />*/}
          {/*</div>*/}
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

                    {type === "album" && (
                        <Card.Title className={"wd-card"}>
                            {item.title}
                            {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                            {/*    {item.user.userName}*/}
                            {/*</Link>*/}
                        </Card.Title>
                    )}

                    {type === "album" && (
                        <Card.Text className={"wd-card"}>
                            <Link to={`/details/artist/${item.apiArtistId}`} className={"wd-link"}>
                                {item.artistName}
                            </Link>
                            {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                            {/*    {item.user.userName}*/}
                            {/*</Link>*/}
                        </Card.Text>
                    )}
                    {type === "album" && (
                        <Card.Text className={"wd-card"}>
                            {item.date}
                            {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                            {/*    {item.user.userName}*/}
                            {/*</Link>*/}
                        </Card.Text>
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
              <Card.Title className={"wd-card"}>
                {item.data.profile.name}
              </Card.Title>
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