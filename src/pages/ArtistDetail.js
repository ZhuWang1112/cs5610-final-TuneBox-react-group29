import React, { useState, useEffect } from "react";
import ArtistBanner from "../components/ArtistComponents/ArtistBanner";
import ArtistAlbums from "../components/ArtistComponents/ArtistAlbums";
import {findArtistDetailsOnCloud, findArtistGeneralInfoById} from "../services/artist-service";
import { findCurrentUserThunk } from "../services/users/users-thunks.js";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";
import { useParams, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const ArtistDetail = () => {
  // const location = useLocation();
  // let artist = {};
  // if (location.state) {
  //   artist = location.state.item;
  // }
  const { id } = useParams();
  const dispatch = useDispatch();
  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);

  const fetchArtistGeneralInfoById = async (artistId) => {
    const artistInfo = await findArtistGeneralInfoById(artistId);
    setArtist(artistInfo);
  };
  const fetchAlbumsInArtist = async (artistId) => {
    const data = await findArtistDetailsOnCloud(artistId);
    setAlbums(data);
  };

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
    fetchAlbumsInArtist(id);
    fetchArtistGeneralInfoById(id);
  }, [id]);
  return (
    <div className={`position-relative`}>
      <ArtistBanner
        artistName={artist.artistName}
        img={artist.img}
        albumNumber={albums.length}
        bannerImg={artist.bannerImg}
      />

      <ArtistAlbums albums={albums} />
    </div>
  );
};

export default ArtistDetail;
