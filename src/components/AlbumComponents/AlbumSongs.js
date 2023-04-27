import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getTracksByAlbumId } from "../../services/track-service.js";
import DetailItem from "../../components/DetailItem";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineFieldTime } from "react-icons/ai";
import { findCurrentUserThunk } from "../../services/users/users-thunks.js";
import { findPlaylists } from "../../services/playlist-service.js";
import {
  findSongNumberByUserId,
  createSongPlaylist,
  deleteSongPlaylist,
} from "../../services/songPlaylist-service.js";
import { findCurrentUserSongsThunk } from "../../services/thunks/like-thunk";
import {
  updateLikeSong,
  deleteLikeSong,
  addLikeSong,
} from "../../reducers/like-reducer.js";
import { insertSongIfNotExist } from "../../services/song-service.js";
import { insertArtistIfNotExist } from "../../services/artist-service.js";
import { SONG_LIMITATION_FOR_REGULAR_USER } from "../../utils/URL.js";

const AlbumSongs = ({ songs }) => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { likedSongs } = useSelector((state) => state.likedSong);
  const navigate = useNavigate();
  const loginId = currentUser ? currentUser._id : null;
  const [playlistsOption, setPlaylistsOption] = useState(null);
  const [songsNumber, setSongsNumber] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const dispatch = useDispatch();

  const albumHandleUnLikeClick = async (song) => {
    if (!currentUser) return;
    // update state in likedSong reducer
    dispatch(deleteLikeSong(song.apiSongId));
    // get _id of the song with the passed apiSongId
    const songToDelete = likedSongs.filter(
      (likedSong) => likedSong.apiSongId === song.apiSongId
    );
    if (songToDelete.length > 0) {
      deleteSongPlaylist(currentUser._id, songToDelete[0]._id);
    }
  };

  const albumHandleAddToPlaylist = async (pid, song, setLike) => {
    if (!currentUser) return;
    if (
      !currentUser.isVip &&
      likedSongs.length >= SONG_LIMITATION_FOR_REGULAR_USER
    ) {
      setShowUpgrade(true);
      return;
    }
    setLike(true);
    // insert the artist to db if not exist [TODO] change img as artist img rather than album img
    const insertedArtist = await insertArtistIfNotExist({
      api: song.apiArtistId,
      name: song.artistName,
      img: song.img,
    });
    // insert the song to db if not exist
    const insertedSong = await insertSongIfNotExist(song);
    // update state in likedSong reduce
    if (insertedSong.length > 0) {
      dispatch(addLikeSong(insertedSong[0]));
      // insert the song-playlist pair into db
      createSongPlaylist(currentUser._id, insertedSong[0]._id, pid);
    }
  };

  const handleMovePlaylist = async () => {};

  const fetchLoginUserPlaylists = async (uid) => {
    const myPlaylists = await findPlaylists(uid);
    setPlaylistsOption(myPlaylists);
    // find how many songs current user likes
    const songNumbersOfLoginUser = await findSongNumberByUserId(uid);
    setSongsNumber(songNumbersOfLoginUser);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(findCurrentUserSongsThunk());
      fetchLoginUserPlaylists(currentUser._id);
    }
  }, [loginId]);
  return (
    <div className={`position-relative`}>
      {showUpgrade && (
        <>
          <div
            className={`col text-white position-absolute upgrade-in-album-div p-3 rounded-3 bg-primary fw-bold`}
          >
            Enjoy your Premium Journey!
            <div className={`text-white upgrade-text`}>
              Upgrade your account to add more songs.
            </div>
            <div
              className={`mt-2 d-flex align-items-center justify-content-end`}
            >
              <button
                className={`btn not-now-btn`}
                onClick={() => setShowUpgrade(false)}
              >
                Not now
              </button>
              <button
                className={` login-btn rounded-pill`}
                onClick={() => {
                  setShowUpgrade(false);
                  navigate("/premium");
                }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </>
      )}
      <div className={`row mt-3 m-0 p-0 w-100 d-flex justify-content-center`}>
        <div className={`col col-xxl-10 col-xl-10 col-lg-10`}>
          <div className={`row w-100 p-0 m-0`}>
            <div className={`col`}>
              <h5 className={`fw-fold text-white`}># TITLE</h5>
            </div>
            <div
              className={`col-2 col-lg-3 col-xl-3 col-xxl-3 text-muted ps-0 d-flex`}
            >
              <AiOutlineFieldTime size={30} />
            </div>
            <div className={`col-2`}></div>
            <div className={`col-1`}></div>
          </div>
        </div>
      </div>
      <div className={`row m-0 p-0 w-100 d-flex justify-content-center`}>
        <div className={`col col-xxl-10 col-xl-10 col-lg-10`}>
          {songs.map((song, idx) => (
            <DetailItem
              key={song.apiSongId + Date.now()}
              type="album"
              song={song}
              isLike={
                likedSongs.filter((val, id) => val.apiSongId === song.apiSongId)
                  .length > 0
              }
              isSelf={currentUser ? true : false}
              playlistsOption={playlistsOption}
              handleUnLikeClick={albumHandleUnLikeClick}
              handleAddToPlaylist={albumHandleAddToPlaylist}
              handleMovePlaylist={handleMovePlaylist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumSongs;
