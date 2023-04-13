import React from "react";
import { useNavigate } from "react-router";

const FollowUserGuest = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        src={`/images/playlist-cover-demo-2.jpeg`}
        width={50}
        height={50}
        className={`rounded-circle position-absolute playlist-demo-left border border-white`}
      />
      <img
        src={`/images/playlist-cover-demo-3.jpeg`}
        width={60}
        height={60}
        className={`rounded-circle position-absolute playlist-demo-middle border border-white`}
      />
      <img
        src={`/images/playlist-cover-demo-1.jpeg`}
        width={50}
        height={50}
        className={`rounded-circle position-absolute playlist-demo-right border border-white`}
      />
      <h4 className={`text-white position-absolute playlist-count`}>
        Join and create your own playlists in TUNEBOX
      </h4>

      <button
        className={`btn btn-danger position-absolute create-playlist text-white`}
        onClick={() => navigate(`/login`)}
      >
        CREATE PLAYLIST
      </button>

      <img
        src={`/images/profile-avatar.jpeg`}
        width={50}
        height={50}
        className={`rounded-circle position-absolute user-demo-1 border border-white`}
      />
      <img
        src={`/images/profile-avatar.jpeg`}
        width={60}
        height={60}
        className={`rounded-circle position-absolute user-demo-2 border border-white`}
      />
      <img
        src={`/images/profile-avatar.jpeg`}
        width={70}
        height={70}
        className={`rounded-circle position-absolute user-demo-3 border border-white`}
      />
      <img
        src={`/images/profile-avatar.jpeg`}
        width={60}
        height={60}
        className={`rounded-circle position-absolute user-demo-4 border border-white`}
      />
      <img
        src={`/images/profile-avatar.jpeg`}
        width={50}
        height={50}
        className={`rounded-circle position-absolute user-demo-5 border border-white`}
      />
      <h4 className={`text-white position-absolute user-guest-title`}>
        Follow more music lovers
      </h4>
      <button
        className={`btn btn-primary position-absolute explore-user text-white`}
        onClick={() => navigate(`/login`)}
      >
        EXPLORE MORE
      </button>
    </>
  );
};

export default FollowUserGuest;
