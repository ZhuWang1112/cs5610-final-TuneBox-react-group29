import React, { useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import { updatePlaylist as updatePlaylistService } from "../../services/playlist-service.js";
import { MdAddAPhoto } from "react-icons/md";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage, { removeImageFromFirebase } from "../../services/firebase.js";

const defaultFile = "/images/playlist-cover.jpeg";
const PlaylistBanner = ({ playlistUser, playlist, setPlaylist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [playlistName, setPlaylistName] = useState(playlist.playListName);
  const [playlistDesc, setPlaylistDesc] = useState(playlist.description);
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState(playlist.img);
  const [avatarFile, setAvatarFile] = useState(null);

  const dispatch = useDispatch();

  const handleUploadFirebase = (file) => {
    if (!file) {
      return;
    }
    removeImageFromFirebase(playlist.img, defaultFile);
    const storageRef = ref(
      storage,
      `/files/${file.name + currentUser._id + "playlist"}`
    );
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUrl(url);
          const newPlaylist = {
            ...playlist,
            playListName:
              playlistName === "" ? playlist.playListName : playlistName,
            description: playlistDesc,
            img: url,
          };
          setPlaylist(newPlaylist);
          updatePlaylistService(newPlaylist);
        });
      }
    );
  };

  const hiddenFileInput = React.useRef(null);

  const handleImgClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImgChange = (event) => {
    event.preventDefault();
    if (event.target.files.length === 0) {
      return;
    }
    const newUrl = URL.createObjectURL(event.target.files[0]);
    setUrl(newUrl);
    setAvatarFile(event.target.files[0]);
  };

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
    let newName = playlistName;
    if (playlistName === "") {
      newName = playlist.playListName;
      setPlaylistName(playlist.playListName);
    }
    const newPlaylist = {
      ...playlist,
      playListName: newName,
      description: playlistDesc,
      img: url,
    };
    // update profile into firebase
    if (url !== playlist.img) {
      handleUploadFirebase(avatarFile);
    } else {
      setPlaylist(newPlaylist);
      updatePlaylistService(newPlaylist);
    }

    playlist.playListName = newName;

    if (playlistName === "") {
      setPlaylistName(playlist.playListName);
    }
    setEdit(false);
  };

  const handleCancel = () => {
    setPlaylistName(playlist.playListName);
    setPlaylistDesc(
      playlist.description === undefined ? "" : playlist.description
    );
    setUrl(playlist.img);
    setEdit(false);
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };
  return (
    <div className={`position-relative`}>
      <BsFillArrowLeftCircleFill
        onClick={handleBackClick}
        size={30}
        className={`position-absolute text-warning arrow-back-icon`}
      />
      <img
        src={`/images/playlist-banner.jpeg`}
        height={`250px`}
        width={`100%`}
      />
      <img
        src={url}
        className={`rounded-3 position-absolute playlist-cover-pos`}
        width={`200px`}
        height={`200px`}
      />
      <h5
        className={`position-absolute playlist-cover-name-pos me-3 d-none d-xl-flex`}
        onClick={() =>
          navigate(
            `/profile${
              !currentUser || playlist.user !== currentUser._id
                ? `/${playlist.user}`
                : ``
            }`
          )
        }
      >
        {playlistUser.name}
      </h5>

      {!edit && (
        <>
          <h1
            className={`text-white position-absolute playlist-cover-text-pos-non-edit d-none d-md-block`}
          >
            {playlistName}
          </h1>

          {currentUser && playlist.user === currentUser._id && (
            <button
              className={`btn btn-dark border border-warning position-absolute playlist-edit-pos rounded-pill ps-3 pe-3 d-none d-lg-block`}
              onClick={() => handleEdit()}
            >
              Edit
            </button>
          )}

          <h4
            className={`text-muted position-absolute playlist-desc-pos-non-edit d-none d-lg-block`}
          >
            {playlistDesc === "" || playlistDesc === undefined
              ? "Add your description..."
              : playlistDesc}
          </h4>
        </>
      )}

      {edit && (
        <>
          <div className={`position-absolute playlist-cover-text-pos`}>
            <label htmlFor="playlist-cover-text" className={`text-warning`}>
              Playlist Name
            </label>
            <input
              className="form-control control-input me-2 playlist-name-input d-none d-lg-block"
              id="playlist-cover-text"
              name="playlist-cover-text"
              type="text"
              placeholder="Type the playlist name..."
              value={playlistName}
              size={1}
              onChange={(e) => handleNameChange(e)}
            />
          </div>

          <button
            className={`btn btn-dark border border-danger position-absolute playlist-confirm-pos rounded-pill ps-3 pe-3 d-none d-lg-block`}
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>

          <button
            className={`btn btn-dark border border-warning position-absolute playlist-cancel-pos rounded-pill ps-3 pe-3 d-none d-lg-block`}
            onClick={() => handleCancel()}
          >
            Cancel
          </button>

          <div className={`position-absolute playlist-desc-pos`}>
            <label htmlFor="playlist-cover-desc" className={`text-warning`}>
              Description
            </label>
            <textarea
              className="form-control control-input me-2 playlist-desc-input d-none d-lg-block"
              id="playlist-cover-desc"
              name="playlist-cover-desc"
              type="text"
              placeholder="Add your description..."
              value={playlistDesc}
              rows={2}
              onChange={(e) => handleDescChange(e)}
            />
          </div>

          <div
            className={`playlist-cover-cover rounded-3 position-absolute playlist-cover-pos bg-muted`}
          ></div>
          <MdAddAPhoto
            className={`position-absolute cover-icon`}
            size={30}
            // ref={hiddenFileInput}
            onClick={handleImgClick}
          />
          <input
            id="upload-banner"
            type="file"
            ref={hiddenFileInput}
            onChange={handleImgChange}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
};

export default PlaylistBanner;
