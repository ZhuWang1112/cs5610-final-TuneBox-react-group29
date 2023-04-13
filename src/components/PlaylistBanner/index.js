import React, { useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import { updatePlaylist as updatePlaylistService } from "../../services/playlist-service.js";
import { MdAddAPhoto } from "react-icons/md";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage, { removeImageFromFirebase } from "../../services/firebase.js";

const defaultFile = "/images/playlist-cover.jpeg";
const PlaylistBanner = ({ playlist }) => {
  const { id } = useParams();
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
          playlist.img = url;
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
    const newName = playlistName === "" ? playlist.playListName : playlistName;
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
    setPlaylistDesc(playlist.description);
    setUrl(playlist.img);
    setEdit(false);
  };

  return (
    <div className={`position-relative`}>
      <img
        src={`/images/playlist-banner.jpeg`}
        height={`250px`}
        width={`100%`}
      />
      <img
        src={url}
        className={`rounded-3 position-absolute playlist-cover-pos`}
        width={`200px`}
      />

      {!edit && (
        <>
          <h1
            className={`text-white position-absolute playlist-cover-text-pos`}
          >
            {playlistName}
          </h1>

          {currentUser &&
            playlist.user === currentUser._id &&
            !playlist.isDefault && (
              <button
                className={`btn btn-dark border border-warning position-absolute playlist-edit-pos rounded-pill ps-3 pe-3`}
                onClick={() => handleEdit()}
              >
                Edit
              </button>
            )}

          <h4 className={`text-muted position-absolute playlist-desc-pos`}>
            {playlistDesc === "" ? "Add your description..." : playlistDesc}
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
            rows={2}
            onChange={(e) => handleDescChange(e)}
          />

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
