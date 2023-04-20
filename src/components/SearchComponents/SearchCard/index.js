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
        navigate("/details/album/" + item.apiAlbumId, {
          state: { title: item.title },
        });
      } else if (type === "track") {
        localStorage.setItem("DetailSingleTrack", JSON.stringify(item));
        navigate("/details/track/" + item["data"]["uri"].split(":")[2]);
      } else if (type === "artist") {
        navigate("/details/artist/" + item.apiArtistId, {
          state: { item },
        });
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


          <Card.Body>


            {type === "album" && (
              <Card.Title className={"wd-card"}>
                {item.title}
                {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                {/*    {item.user.userName}*/}
                {/*</Link>*/}
              </Card.Title>
            )}

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
                {item.date}
                {/*<Link className={"wd-link"} to={(currentUser !== null && item.user._id === currentUser._id) ? `/profile` : `/profile/${item.user._id}`}>*/}
                {/*    {item.user.userName}*/}
                {/*</Link>*/}
              </Card.Text>
            )}



            {type === "local-artist" && (
                <Card.Title className={"wd-card"}>{item.name}</Card.Title>
            )}

            {type === "track" && (
                <Card.Title className={"wd-card"}>{item.data.name}</Card.Title>
            )}

            {type === "artist" && (
              <Card.Title className={"wd-card"}>{item.artistName}</Card.Title>
            )}




          </Card.Body>
        </Card>
      </div>
    );
};
export default SearchCard;