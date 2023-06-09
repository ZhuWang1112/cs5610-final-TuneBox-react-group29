import Card from "react-bootstrap/Card";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import "./index.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  changeTrack,
  updateIsPlaying,
} from "../../reducers/currentTrack-reducer";
import React from "react";

const HomeCard = ({ item, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // change to read currentUser from redux since the info of currentUser may be updated
  const { currentUser } = useSelector((state) => state.user);
  const handleClick = (e) => {
    if (e.target.tagName === "A") {
      // if the click is on the link, do not navigate
      return;
    }
    if (type === "album") {
      navigate("/details/album/" + item.apiAlbumId);
    } else if (type === "playlist") {
      navigate("/details/playlist/" + item._id);
    } else if (type === "artist") {
      navigate("/details/artist/" + item.apiArtistId);
    } else if (type === "user") {
      navigate("/profile/" + item._id);
    }
  };

  const isPlaying = useSelector((state) => state.currentTrack.isPlaying);
  const track = useSelector((state) => state.currentTrack.track);
  const handlePlay = () => {
    if (type !== "song") return;
    if (track.apiSongId === item.apiSongId) {
      dispatch(updateIsPlaying(!isPlaying));
    } else {
      dispatch(changeTrack(item));
    }
  };
  const handleNavigateToArtist = (apiArtistId) => {
    navigate(`/artist/details/${apiArtistId}`);
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
        <Card.Img
          variant="top"
          className={"wd-card-img-custom "}
          src={item.img}
        />
        {type === "song" && (
          <>
            {isPlaying && track.apiSongId === item.apiSongId ? (
              <AiFillPauseCircle
                className={"wd-play-button"}
                size={40}
                onClick={() => handlePlay()}
              />
            ) : (
              <AiFillPlayCircle
                className={"wd-play-button"}
                size={40}
                onClick={() => handlePlay()}
              />
            )}
          </>
        )}
        <Card.Body>
          {type === "album" && (
            <Card.Title className={"wd-card"}>
              <Link
                to={`/details/album/${item.apiAlbumId}`}
                className={"wd-link"}
              >
                {item.title}
              </Link>
            </Card.Title>
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
          {type === "playlist" && (
            <Card.Title className={"wd-card"}>{item.playListName}</Card.Title>
          )}
          {type === "playlist" && (
            <Card.Text className={"wd-card"}>
              {/*{JSON.stringify(item.user)}*/}
              <Link
                className={"wd-link"}
                to={
                  currentUser !== null && item.user._id === currentUser._id
                    ? `/profile`
                    : `/profile/${item.user._id}`
                }
              >
                {item.user.userName}
              </Link>
            </Card.Text>
          )}
          {type === "playlist" && (
            <Card.Text className={"wd-card"}>
              {item.description ? item.description : "None"}
            </Card.Text>
          )}
          {type === "playlist" && (
            <Card.Title className={"wd-card"}>
              Rating: {item.rating.toFixed(2)}
            </Card.Title>
          )}
          {type === "user" && (
            <Card.Title className={"wd-card"}>
              <Link
                className={"wd-link"}
                to={
                  currentUser !== null && item._id === currentUser._id
                    ? `/profile`
                    : `/profile/${item._id}`
                }
              >
                {item.userName}
              </Link>
            </Card.Title>
          )}
          {type === "artist" && (
            <Card.Title className={"wd-card"}>
              <Link
                to={`/details/artist/${item.apiArtistId}`}
                className={"wd-link"}
              >
                {item.artistName}
              </Link>
            </Card.Title>
          )}
          {type === "artist" && type === "album" && (
            <Card.Text className={"wd-card"}>Rank: {item.rank}</Card.Text>
          )}

          {type === "song" && (
            <>
              <Card.Title className={"wd-card"}>
                {item.songName ? item.songName : "Unknown"}
              </Card.Title>
              <Card.Text
                className={"wd-card artist-click-format"}
                onClick={() => handleNavigateToArtist(item.apiArtistId)}
              >
                {item.artistName ? item.artistName : "Unknown"}
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default HomeCard;
