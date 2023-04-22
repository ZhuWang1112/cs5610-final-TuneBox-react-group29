import Card from "react-bootstrap/Card";
import "./index.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {changeTrack, updateIsPlaying} from "../../../reducers/currentTrack-reducer";
import {BsFillPauseCircleFill, BsFillPlayCircleFill} from "react-icons/bs";
import React, {useState} from "react";
import {AiFillHeart, AiFillPlayCircle} from "react-icons/ai";

import { AiOutlineHeart } from "react-icons/ai";
import { SONG_LIMITATION_FOR_REGULAR_USER } from "../../../utils/URL";
import { deleteLikeSong, addLikeSong } from "../../../reducers/like-reducer";
import { insertSongIfNotExist } from "../../../services/song-service";
import { insertArtistIfNotExist } from "../../../services/artist-service";
import {
  createSongPlaylist,
  deleteSongPlaylist,
} from "../../../services/songPlaylist-service";

const defaultImg = "/images/question.png";
const SearchCard = ({ item, type, setShowUpgrade }) => {
  if (!item.img || item.img === undefined || item.img === "") {
    item.img = "/images/question.png";
  }
  const navigate = useNavigate();
  // change to read currentUser from redux since the info of currentUser may be updated
  const { currentUser } = useSelector((state) => state.user);
  // playing status -- boolean
  const isPlaying = useSelector((state) => state.currentTrack.isPlaying);
  // current song
  const track = useSelector((state) => state.currentTrack.track);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const iconSize = 25;
  const { likedSongs } = useSelector((state) => state.likedSong);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // change route to details page
  const handleClick = () => {
    if (type === "album") {
      navigate("/details/album/" + item.apiAlbumId);
    } else if (type === "artist") {
      navigate("/details/artist/" + item.apiArtistId);
    } else if (type === "local-artist") {
      navigate("/artist/details/" + item.api);
    } else if (type === "local-playlist") {
      navigate("/details/playlist/" + item["_id"]);
    }
  };

  //play musics online: track is cloud, local-song is from DB
  const handlePlay = () => {
    if (type === "track") {
      const newItem = item.data;
      // newItem._id = newItem.id;
      newItem.apiSongId = newItem.id;
      if (track.apiSongId === newItem.apiSongId) {
        dispatch(updateIsPlaying(!isPlaying));
      } else {
        dispatch(changeTrack(newItem));
      }
    } else if (type === "local-song") {
      const newItem = item;
      if (track.apiSongId === newItem._id) {
        dispatch(updateIsPlaying(!isPlaying));
      } else {
        dispatch(changeTrack(newItem));
      }
    }
  };

  const handleUnLike = () => {
    const songToDelete = likedSongs.filter(
      (likedSong) => likedSong.apiSongId === item.apiSongId
    );
    // update likedSongs state
    dispatch(deleteLikeSong(item.apiSongId));
    // remove record using userId, songId from songPlaylist table

    if (songToDelete.length > 0) {
      deleteSongPlaylist(currentUser._id, songToDelete[0]._id);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;
    if (
      !currentUser.isVip &&
      likedSongs &&
      likedSongs.length >= SONG_LIMITATION_FOR_REGULAR_USER
    ) {
      setShowUpgrade(true);
      return;
    }
    // update likedSongs state
    // insert the artist to db if not exist [TODO] change img as artist img rather than album img
    const insertedArtist = await insertArtistIfNotExist({
      api: item.apiArtistId,
      name: item.artistName,
      img: item.img === "" ? defaultImg : item.img,
    });
    // insert the song to db if not exist
    const insertedSong = await insertSongIfNotExist(item);
    // update state in likedSong reduce
    if (insertedSong.length > 0) {
      dispatch(addLikeSong(insertedSong[0]));
      // insert the song-playlist pair into db
      // get default playlist
      const { _id } = JSON.parse(localStorage.getItem("defaultPlaylist"));
      createSongPlaylist(currentUser._id, insertedSong[0]._id, _id);
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

        {(type === "album" ||
          type === "artist" ||
          type === "local-playlist" ||
          type === "local-artist") && (
          <Card.Img
            variant="top"
            className={"wd-card-img-custom "}
            // src={item.img === "" ? defaultImg : item.img}
            src={item.img}
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
                : defaultImg
            }
          />
        )}

        {type === "local-song" && (
          <Card.Img
            variant="top"
            className={"wd-card-img-custom "}
            // src={item["img"] ? item["img"] : defaultImg}
            src={item.img}
          />
        )}

        <Card.Body>
          {type === "album" && (
            <Card.Title className={"wd-card"}>{item.title}</Card.Title>
          )}

          {type === "playlist" && (
            <Card.Text className={"wd-card"}>{item.data.name}</Card.Text>
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
            <Card.Text className={"wd-card"}>{item.date}</Card.Text>
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

          {type === "artist" && (
            <Card.Title className={"wd-card"}>{item.artistName}</Card.Title>
          )}
        </Card.Body>

        {(type === "local-song" || type === "track") &&
          (currentUser ? (
            likedSongs.filter((val, id) => val.apiSongId === item.apiSongId)
              .length > 0 ? (
              <AiFillHeart
                size={25}
                className={`text-danger`}
                onClick={() => handleUnLike()}
              />
            ) : (
              <AiFillHeart
                size={25}
                className={`text-muted`}
                onClick={() => handleLike()}
              />
            )
          ) : (
            <div className={`position-relative`}>
              <div onClick={() => setShow(!show)}>
                <AiOutlineHeart size={iconSize} className={`text-muted`} />
              </div>
              {show && (
                <div className={`like-toolkit-div position-absolute rounded-3`}>
                  <h5 className={`text-white fw-bold m-2`}>
                    Enjoy your Journey!
                  </h5>
                  <div
                    className={`mt-3 mb-1 d-flex justify-content-center align-items-center`}
                  >
                    <button
                      className={`btn btn-light p-1`}
                      onClick={() => navigate("/login")}
                    >
                      Log in
                    </button>
                    <p
                      className={`text-muted mb-0 ms-3 not-now`}
                      onClick={() => setShow(false)}
                    >
                      Not Now
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
      </Card>
    </div>
  );
};
export default SearchCard;