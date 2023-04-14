import Card from "react-bootstrap/Card";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./index.css";
import {Link, Navigate} from "react-router-dom";

const HomeCard = ({ item, type }) => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const handleClick = () => {
        if (type === "album") {
            <Navigate to={`/album/${item._id}`} />
        } else if (type === "playlist") {
            <Navigate to={`/playlist/${item._id}`} />
        } else if (type === "artist") {
            <Navigate to={`/artist/${item._id}`} />
        }
    }

    return (
      <div className={"m-2"}>
        <Card
          className="wd-card-container wd-card-content"
          style={{
            width: type === "user" || type === "playlist" ? "13rem" : "10rem",
          }}
          onClick={handleClick}
        >
          <Card.Img
            variant="top"
            className={"wd-card-img-custom "}
            src={item.img}
          />
          <div className="wd-play-button">
            <PlayArrowIcon />
          </div>
          <Card.Body>
            {type === "album" && (
              <Card.Title className={"wd-card"}>{item.title}</Card.Title>
            )}
            {type === "album" && (
              <Card.Text className={"wd-card"}>{item.artist}</Card.Text>
            )}
            {type === "playlist" && (
              <Card.Text className={"wd-card"}>
              <Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>
                  {item.user.userName}
              </Link>
              </Card.Text>
            )}
            {type === "playlist" && (
              <Card.Text className={"wd-card"}>
                Desc: {item.description}
              </Card.Text>
            )}
              {type === "playlist" && (
                  <Card.Title className={"wd-card"}>Rating: {item.rating}</Card.Title>
              )}
            {type === "user" && (
              <Card.Title className={"wd-card"}>
              <Link className={"wd-link"} to={(currentUser !== null && item._id === currentUser._id) ? `/profile` : `/profile/${item._id}`}>
                  {item.userName}
              </Link>
              </Card.Title>
            )}
            {type === "artist" && (
              <Card.Title className={"wd-card"}>{item.artist}</Card.Title>
            )}
            {type === "artist" && type === "album" && (
              <Card.Text className={"wd-card"}>Rank: {item.rank}</Card.Text>
            )}

            {type === "song" && (
              <>
                {/* <Card.Title className={"wd-card"}>{item.songName}</Card.Title>
                <Card.Text className={"wd-card"}>{item.artist}</Card.Text> */}
                <Card.Title className={"wd-card"}>songName</Card.Title>
                <Card.Text className={"wd-card"}>artist</Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    );
};
export default HomeCard;