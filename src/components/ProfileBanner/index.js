import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createFollow, deleteFollow } from "../../reducers/follow-reducer";
import { findUser, updateUser } from "../../services/user-service";
import { findFolloweeIds } from "../../services/follow-service";
import { updateFolloweeThunk } from "../../services/thunks/follow-thunk";
import { updateProfile } from "../../reducers/profile-reducer";
import { MdAddAPhoto } from "react-icons/md";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage, { removeImageFromFirebase } from "../../services/firebase.js";

const defaultFile = "/images/profile-avatar.jpeg";
const ProfileBanner = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const [hasFollow, setHasFollow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { currentProfile } = useSelector((state) => state.profile);
  const [email, setEmail] = useState(currentProfile.email);
  const [url, setUrl] = useState(currentProfile.img);
  const [avatarFile, setAvatarFile] = useState(null);

  let loginUser = localStorage.getItem("currentUser");
  if (loginUser) {
    loginUser = JSON.parse(loginUser);
  }

  const checkIsFollow = async (loginUser, targetUser) => {
    const res = await findFolloweeIds(loginUser);
    const followeeList = res[0].followeeList;
    const index = followeeList.indexOf(targetUser);
    setHasFollow(index === -1 ? false : true);
  };
  const handleFollow = () => {
    setHasFollow(!hasFollow);
    dispatch(
      updateFolloweeThunk({
        user: loginUser._id,
        followId: uid,
      })
    );
  };

  const handleUploadFirebase = (file) => {
    if (!file) {
      return;
    }
    removeImageFromFirebase(currentProfile.img, defaultFile);
    const storageRef = ref(storage, `/files/${file.name}`);
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
          setUrl(url);
          localStorage.setItem("recent-user-img", url);
          updateUser({
            _id: loginUser._id,
            email: email,
            img: url,
          });
        });
      }
    );
  };

  const handleSubmit = () => {
    const newProfile = {
      _id: loginUser._id,
      email: email,
      img: url,
    };
    dispatch(updateProfile(newProfile));

    // update profile into firebase
    if (url !== currentProfile.img) {
      handleUploadFirebase(avatarFile);
    } else {
      updateUser(newProfile);
    }

    setIsEdit(false);
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
    // setProfile_({ ...profile_, avatar: url });
  };

  const handleCancel = () => {
    setEmail(currentProfile.email);
    setIsEdit(false);
    setUrl(currentProfile.img);
  };

  useEffect(() => {
    checkIsFollow(loginUser._id, uid ? uid : loginUser._id);
  }, [uid, loginUser]);

  return (
    <div>
      {currentProfile && (
        <div className={`d-flex justify-content-start position-relative`}>
          <img
            src={`/images/profile_banner.jpg`}
            width="90%"
            height="300px"
            className={`m-0 rounded-5`}
          />
          <img
            src={url}
            width="100px"
            className={`position-absolute avatar-position rounded-circle`}
          />
          <h5 className={`position-absolute text-white username-position`}>
            {currentProfile.userName}
          </h5>
          {!uid && (
            <>
              {isEdit && (
                <>
                  <div
                    className={`input-email position-absolute email-input-position`}
                  >
                    <input
                      className="form-control"
                      id={"email"}
                      name={"name"}
                      type="text"
                      placeholder={"Email"}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`avatar-cover rounded-circle position-absolute avatar-position bg-muted`}
                  ></div>
                  <MdAddAPhoto
                    className={`position-absolute avatar-icon`}
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
                  <button
                    className={`btn btn-danger border border-danger position-absolute save-position text-white`}
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                  <button
                    className={`btn btn-warning border border-warning position-absolute cancel-position text-white`}
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                </>
              )}
              {!isEdit && (
                <>
                  <p className={`position-absolute text-muted email-position`}>
                    {currentProfile.email}
                  </p>
                  <button
                    className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </>
          )}
          {uid && !hasFollow && (
            <button
              className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
              onClick={() => handleFollow()}
            >
              + Follow
            </button>
          )}
          {uid && hasFollow && (
            <button
              className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
              onClick={() => handleFollow()}
            >
              + UnFollow
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileBanner;
