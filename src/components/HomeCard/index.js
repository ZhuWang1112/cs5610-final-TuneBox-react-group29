import Card from "react-bootstrap/Card";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./index.css";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const HomeCard = ({ item, type }) => {
  const navigate = useNavigate();

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // change to read currentUser from redux since the info of currentUser may be updated
  const { currentUser } = useSelector((state) => state.user);
  const handleClick = () => {
    if (type === "album") {
      navigate("/album/" + item._id);
    } else if (type === "playlist") {
      navigate("/details/playlist/" + item._id);
    } else if (type === "artist") {
      navigate("/artist/" + item._id);
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
            <Card.Title className={"wd-card"}>
              <Link to={`/album/${item._id}`} className={"wd-link"}>
                {item.title}
              </Link>
              {/*{item.title}*/}
            </Card.Title>
          )}
          {type === "album" && (
            <Card.Text className={"wd-card"}>
              <Link to={`/artist/${item.artist._id}`} className={"wd-link"}>
                {item.artist}
              </Link>
              {/*{item.artist}*/}
            </Card.Text>
          )}
          {type === "playlist" && (
            <Card.Text className={"wd-card"}>
              {JSON.stringify(item.user)}
              {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
              {/*    {item.user.userName}*/}
              {/*</Link>*/}
            </Card.Text>
          )}
          {type === "playlist" && (
            <Card.Text className={"wd-card"}>{item.description}</Card.Text>
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
            <Card.Title className={"wd-card"}>{item.artist}</Card.Title>
          )}
          {type === "artist" && type === "album" && (
            <Card.Text className={"wd-card"}>Rank: {item.rank}</Card.Text>
          )}

          {type === "song" && (
            <>
              <Card.Title className={"wd-card"}>{item.songName}</Card.Title>
              <Card.Text className={"wd-card"}>{item.artist}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default HomeCard;