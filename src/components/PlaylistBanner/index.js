import React, { useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
const PlaylistBanner = ({ playlist }) => {
  const { id } = useParams();
  console.log(playlist);
  const [playlistName, setPlaylistName] = useState(playlist.playListName);
  const [playlistDesc, setPlaylistDesc] = useState(playlist.description);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };
  const handleDescChange = (e) => {
    setPlaylistDesc(e.target.value);
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const handleConfirm = (e) => {
    const newName = playlistName === "" ? playlist.playListName : playlistName;
    const newPlaylist = {
      ...playlist,
      playListName: newName,
      description: playlistDesc,
    };
    dispatch(updatePlaylist(newPlaylist));
    setEdit(false);
  };
  const handleCancel = () => {
    setPlaylistName(playlist.name);
    setPlaylistDesc(playlist.desc);
    setEdit(false);
  };

  return (
    <div className={`position-relative`}>
      <img
        src={`/images/playlist-banner.jpeg`}
        height={`400px`}
        width={`100%`}
      />
      <img
        src={`/images/playlist-cover.jpeg`}
        className={`rounded-3 position-absolute playlist-cover-pos`}
        width={`200px`}
      />

      {!edit && (
        <>
          <h1
            className={`text-white position-absolute playlist-cover-text-pos`}
          >
            {playlist.playListName}
          </h1>

          <button
            className={`btn btn-dark border border-warning position-absolute playlist-edit-pos rounded-pill ps-3 pe-3`}
            onClick={() => handleEdit()}
          >
            Edit
          </button>

          <h4 className={`text-muted position-absolute playlist-desc-pos`}>
            {playlist.description === ""
              ? "Add your description..."
              : playlist.description}
          </h4>
          <h4 className={`position-absolute playlist-num-pos text-white`}>
            {playlist.songs.length} songs
          </h4>
        </>
      )}

      {edit && (
        <>
          <input
            className="form-control control-input me-2 position-absolute playlist-cover-text-pos playlist-name-input"
            id="playlist-cover-text"
            name="playlist-cover-text"
            type="text"
            placeholder="Type the playlist name..."
            value={playlistName}
            onChange={(e) => handleNameChange(e)}
          />
          <button
            className={`btn btn-dark border border-danger position-absolute playlist-confirm-pos rounded-pill ps-3 pe-3`}
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>

          <button
            className={`btn btn-dark border border-warning position-absolute playlist-cancel-pos rounded-pill ps-3 pe-3`}
            onClick={() => handleCancel()}
          >
            Cancel
          </button>

          <textarea
            className="form-control control-input me-2 position-absolute playlist-desc-pos playlist-name-input"
            id="playlist-cover-desc"
            name="playlist-cover-desc"
            type="text"
            placeholder="Add your description..."
            value={playlistDesc}
            rows={5}
            onChange={(e) => handleDescChange(e)}
          />
        </>
      )}
    </div>
  );
};

export default PlaylistBanner;
