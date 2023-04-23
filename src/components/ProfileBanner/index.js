import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
import { findFolloweeIds } from "../../services/follow-service";
import { updateFolloweeThunk } from "../../services/thunks/follow-thunk";
import { updateProfile } from "../../reducers/profile-reducer";
import { MdAddAPhoto } from "react-icons/md";
import FollowUserGuest from "./FollowUserGuest";
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
  const [phone, setPhone] = useState(
    currentUser ? currentUser.cellphone : null
  );
  const [url, setUrl] = useState(
    currentUser ? currentUser.img : "/images/profile-avatar.jpeg"
  );
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
              ...currentUser,
              _id: currentUser._id,
              email: email === "" ? currentUser.email : email,
              cellphone: phone === "" ? currentUser.cellphone : phone,
              img: url,
            })
          );
        });
      }
    );
  };

  const handleSubmit = () => {
    let newEmail = email;
    let newPhone = phone;
    if (email === "") {
      setEmail(currentUser.email);
      newEmail = currentUser.email;
    }
    if (phone === "") {
      setPhone(currentUser.cellphone);
      newPhone = currentUser.cellphone;
    }
    const newProfile = {
      _id: currentUser._id,
      ...currentUser,
      email: newEmail,
      cellphone: newPhone,
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
    setPhone(currentProfile.cellphone);
  };

  useEffect(() => {
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
                    className={`input-email position-absolute email-input-position d-flex align-items-center`}
                  >
                    <label htmlFor={`profile-email`} className={`text-warning`}>
                      Email
                    </label>
                    <input
                      className="form-control ms-3"
                      id={"profile-email"}
                      name={"email"}
                      type="text"
                      placeholder={"Email"}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    className={`input-email position-absolute phone-input-position d-flex align-items-center`}
                  >
                    <label htmlFor={`profile-phone`} className={`text-warning`}>
                      Phone
                    </label>
                    <input
                      className="form-control profile-info-edit ms-2"
                      id={"profile-phone"}
                      name={"phone"}
                      type="text"
                      placeholder={"Phone"}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
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
                  <p
                    className={`position-absolute text-muted email-position p-0 m-0`}
                  >
                    {currentProfile.email}
                  </p>
                  <p
                    className={`position-absolute text-muted phone-position m-0`}
                  >
                    {currentProfile.cellphone}
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
                  <h5 className={`text-white fw-bold m-2`}>Explore friends!</h5>
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
