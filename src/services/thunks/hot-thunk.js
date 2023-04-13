import * as service from "../hot-service";
import {createAsyncThunk} from "@reduxjs/toolkit";
export const hotArtistThunk = createAsyncThunk(
    "home/hotArtists",
    async () => await service.hotArtists()
);
export const hotAlbumThunk = createAsyncThunk(
    "home/hotAlbums",
    async () => await service.hotAlbums()
);
export const hotPlaylistThunk = createAsyncThunk(
    "home/hotPlaylists",
    async () => await service.hotPlaylists()
);
export const hotUserThunk = createAsyncThunk(
    "home/hotUsers",
    async () => await service.hotUsers()
);