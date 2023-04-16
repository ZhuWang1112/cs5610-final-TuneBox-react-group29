import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createFollow, deleteFollow } from "../../reducers/follow-reducer";
import { findUser, updateUser } from "../../services/user-service";
import {
  updateUserNonAdminThunk,
  updateUserThunk,
} from "../../services/users/users-thunks";
import { findFolloweeIds } from "../../services/follow-service";
import { updateFolloweeThunk } from "../../services/thunks/follow-thunk";
import { updateProfile } from "../../reducers/profile-reducer";
import { MdAddAPhoto } from "react-icons/md";
import FollowUserGuest from "./FollowUserGuest";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
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
  const navigate = useNavigate();
  const [hasFollow, setHasFollow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  let { currentProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.user);
  if (!currentProfile) {
    currentProfile = { email: null, img: null };
  }
  const [email, setEmail] = useState(currentUser ? currentUser.email : null);
  const [url, setUrl] = useState(currentProfile.img);
  const [avatarFile, setAvatarFile] = useState(null);

  const checkIsFollow = async (loginUser, targetUser) => {
    const res = await findFolloweeIds(loginUser);
    if (res.length === 0) return;
    const followeeList = res[0].followeeList;
    const index = followeeList.indexOf(targetUser);
    setHasFollow(index === -1 ? false : true);
  };

  const handleFollow = () => {
    if (!currentUser) {
      setShow(!show);
      return;
    }
    setHasFollow(!hasFollow);
    dispatch(
      updateFolloweeThunk({
        user: currentUser._id,
        followId: uid,
      })
    );
  };

  const handleUploadFirebase = (file) => {
    if (!file) {
      return;
    }
    removeImageFromFirebase(currentProfile.img, defaultFile);
    const storageRef = ref(
      storage,
      `/files/${file.name + currentUser._id + "profile"}`
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
          setUrl(url);
          dispatch(
            updateUserNonAdminThunk({
              _id: currentUser._id,
              email: email === "" ? currentUser.email : email,
              img: url,
            })
          );
        });
      }
    );
  };

  const handleSubmit = () => {
    let newEmail = email;
    if (email === "") {
      setEmail(currentUser.email);
      newEmail = currentUser.email;
    }
    const newProfile = {
      _id: currentUser._id,
      email: newEmail,
      img: url,
    };
    dispatch(updateProfile(newProfile));
    // update profile into firebase
    if (url !== currentProfile.img) {
      handleUploadFirebase(avatarFile);
    } else {
      dispatch(updateUserNonAdminThunk(newProfile));
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
  };

  const handleCancel = () => {
    setEmail(currentProfile.email);
    setIsEdit(false);
    setUrl(currentProfile.img);
  };

  useEffect(() => {
    console.log("render");
    if (!currentUser && !uid) return;
    checkIsFollow(
      currentUser ? currentUser._id : null,
      uid ? uid : currentUser._id
    );
  }, [uid]);

  return (
    <div>
      {currentProfile && (
        <div className={`d-flex justify-content-start position-relative`}>
          <img
            src={`/images/profile_banner.jpg`}
            width={`100%`}
            height="320px"
            className={`m-0 rounded-5`}
          />

          {(uid || currentUser) && (
            <>
              <img
                src={uid ? currentProfile.img : url}
                width="100px"
                height="100px"
                className={`position-absolute avatar-position rounded-circle`}
              />
              <h5 className={`position-absolute text-white username-position`}>
                {currentProfile.userName}
              </h5>
            </>
          )}

          {currentUser && !uid && (
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
          {!uid && !currentUser && (
            <div className={``}>
              <FollowUserGuest />
            </div>
          )}

          {uid && !hasFollow && (
            <div className={``}>
              <button
                className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
                onClick={() => handleFollow()}
              >
                + Follow
              </button>
              {show && (
                <div
                  className={`profile-banner-toolkit-div position-absolute rounded-3`}
                >
                  <h5 className={`text-white fw-bold m-2`}>
                    Explore more friends!
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
