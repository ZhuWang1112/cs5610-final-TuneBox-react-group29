import Card from "react-bootstrap/Card";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./index.css";
import {Link} from "react-router-dom";

const HomeCard = ({ item, type }) => {

    return (
        <div className={"m-2"}>
                <Card className="wd-card-container wd-card-content" style={{ width: type === "user" || type === "playlist" ? "13rem" : "10rem"}}>
                    <Card.Img variant="top" className={"wd-card-img-custom "} src={item.img} />
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
                            <Card.Title className={"wd-card"}>{item.playListName}</Card.Title>
                        )}
                        {type === "playlist" && (
                            <Card.Text className={"wd-card"}>
                                <Link to={`/profile/${item.user._id}`}>{item.user.userName}</Link>
                            </Card.Text>
                        )}
                        {type === "playlist" && (
                            <Card.Text className={"wd-card"}>Desc: {item.description}</Card.Text>
                        )}
                        {type === "user" && (
                            <Card.Title className={"wd-card"}>{item.userName}</Card.Title>
                        )}
                        {type === "artist" && (
                            <Card.Title className={"wd-card"}>{item.artist}</Card.Title>
                        )}
                        {type === "artist" && type === "album" && (<Card.Text className={"wd-card"}>Rank: {item.rank}</Card.Text>)}
                    </Card.Body>
                </Card>
        </div>

    );
};
export default HomeCard;