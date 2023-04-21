import React, { useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai";
import { MdRemoveCircle } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateIsPlaying } from "../../reducers/currentTrack-reducer";
import { getTrackThunk } from "../../services/thunks/track-thunk";
import "./index.css";
import {BsFillPauseCircleFill, BsFillPlayCircleFill} from "react-icons/bs";

const LikeSongItem = ({ song, handleRemoveSong, isSelf }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPlaying = useSelector((state) => state.currentTrack.isPlaying);
  const track = useSelector((state) => state.currentTrack.track);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handlePlay = () => {
    if (track.apiSongId === song.apiSongId) {
      dispatch(updateIsPlaying(!isPlaying));
    } else {
        console.log("song!!! ", song)
      dispatch(getTrackThunk(song));
    }
  };
  return (
    <div className={`mx-2 mt-3 position-relative song-item-div`}>
      {isSelf && (
        <div className={`position-absolute song-remove-icon p-0`}>
          <MdRemoveCircle size={25} onClick={() => handleRemoveSong(song)} />
        </div>
      )}
      <div className={`d-flex justify-content-center`}>
        <div
          className={`d-flex justify-content-center song-item-card`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img src={song.img} width={110} height={110} />
          {/* <img src={`/images/comment-picture.png`} width={110} height={110} /> */}
          {isHovering && (
              <>
                  {isPlaying && track.apiSongId === song.apiSongId ? (
                      <AiFillPauseCircle
                          className={`position-absolute song-play-icon text-dark`}
                          size={40}
                          onClick={() => handlePlay()}
                      />
                  ) : (
                      <AiFillPlayCircle
                          className={`position-absolute song-play-icon text-dark`}
                          size={40}
                          onClick={() => handlePlay()}
                      />
                  )}
              </>
          )}
        </div>
      </div>

      <div className={`d-flex justify-content-start mt-2`}>
        <h5 className={`text-white text-nowrap song-item-name`}>
          {song.songName}
        </h5>
      </div>
      <div
        className={`d-flex justify-content-start artist-see-more-div`}
        onClick={() => navigate(`/artist/details/${song.apiArtistId}`)}
      >
        <p className={`mb-0 text-nowrap song-item-artist`}>{song.artist}</p>
      </div>
    </div>
  );
};

export default LikeSongItem;
