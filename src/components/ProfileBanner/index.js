import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createFollow, deleteFollow } from "../../reducers/follow-reducer";
import { findUser, updateUser } from "../../services/user-service";
import { findFolloweeIds } from "../../services/follow-service";
import { updateFolloweeThunk } from "../../services/thunks/follow-thunk";
import { updateProfile } from "../../reducers/user-reducer";
import { MdAddAPhoto } from "react-icons/md";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "../../services/firebase.js";

const defaultFile = "/images/profile-avatar.jpeg";
const ProfileBanner = ({ isSelf }) => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const [hasFollow, setHasFollow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user.email);
  const [url, setUrl] = useState(user.img);
  const [avatarFile, setAvatarFile] = useState(null);

  console.log("profile in banner: ", user);

  const loginUser = localStorage.getItem("userId");

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
        user: loginUser,
        followId: uid,
      })
    );
  };

  const removeImageFromFirebase = (url) => {
    if (url === defaultFile) return;
    const deleteRef = ref(storage, url);

    deleteObject(deleteRef)
      .then(function () {
        // File deleted successfully
        console.log("File Deleted");
      })
      .catch(function (e) {
        console.log("File not exist");
      });
  };

  const handleUploadFirebase = (file) => {
    if (!file) {
      return;
    }
    removeImageFromFirebase(user.img);
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
          console.log(url);
          setUrl(url);

          updateUser({
            _id: uid,
            email: email,
            img: url,
          });
        });
      }
    );
  };

  const handleSubmit = () => {
    const newProfile = {
      _id: uid,
      email: email,
      img: url,
    };
    dispatch(updateProfile(newProfile));

    // update profile into firebase
    if (url !== user.img) {
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
    console.log("url: ", newUrl);
    console.log("file changed: ", event.target.files[0]);
    setAvatarFile(event.target.files[0]);
    // setProfile_({ ...profile_, avatar: url });
  };

  const handleCancel = () => {
    setEmail(user.email);
    setIsEdit(false);
    setUrl(user.img);
  };

  useEffect(() => {
    checkIsFollow(loginUser, uid);
  }, [uid, loginUser]);

  return (
    <div>
      {user && (
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
            {user.userName}
          </h5>
          {isSelf && (
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
                    {user.email}
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
          {!isSelf && !hasFollow && (
            <button
              className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
              onClick={() => handleFollow()}
            >
              + Follow
            </button>
          )}
          {!isSelf && hasFollow && (
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
