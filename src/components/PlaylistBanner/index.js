import React from "react";
import "./index.css";
import { useParams } from "react-router-dom";

const PlaylistBanner = () => {
  const { username, name } = useParams();
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

      <h1 className={`text-white position-absolute playlist-cover-text-pos`}>
        {name}
      </h1>
      <button
        className={`btn btn-dark border border-warning position-absolute playlist-edit-pos rounded-pill ps-3 pe-3`}
      >
        Edit
      </button>
      <h4 className={`text-muted position-absolute playlist-desc-pos`}>
        Add your description...
      </h4>
    </div>
  );
};

export default PlaylistBanner;
