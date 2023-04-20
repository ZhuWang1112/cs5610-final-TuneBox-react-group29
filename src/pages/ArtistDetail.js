import React, { useState, useEffect } from "react";
import ArtistBanner from "../components/ArtistComponents/ArtistBanner";
import ArtistAlbums from "../components/ArtistComponents/ArtistAlbums";
import { findArtistDetailsOnCloud } from "../services/artist-service";
import { findCurrentUserThunk } from "../services/users/users-thunks.js";
import { useParams, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const ArtistDetail = () => {
  const location = useLocation();
  let artist = {};
  if (location.state) {
    artist = location.state.item;
  }
  const { id } = useParams();
  const dispatch = useDispatch();
  const [albums, setAlbums] = useState([]);

  const fetchAlbumsInArtist = async (artistId) => {
    const data = await findArtistDetailsOnCloud(artistId);
    setAlbums(data);
  };

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    fetchAlbumsInArtist(id);
  }, [id]);
  return (
    <div className={`position-relative`}>
      <ArtistBanner
        artistName={artist.artistName}
        img={artist.img}
        albumNumber={albums.length}
      />

      <ArtistAlbums albums={albums} />
    </div>
  );
};

export default ArtistDetail;
