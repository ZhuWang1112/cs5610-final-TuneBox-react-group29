import {hotAlbumThunk, hotArtistThunk, hotPlaylistThunk, hotUserThunk} from "../services/thunks/hot-thunk";
import {createSlice} from "@reduxjs/toolkit";

const hotSlice = createSlice({
    name: "hot",
    initialState: { artists: [], albums: [], playlists: [], users: [] },
    reducers: {},
    extraReducers: {
        [hotArtistThunk.fulfilled]: (state, { payload }) => {
            state.artists = payload;
        },
        [hotAlbumThunk.fulfilled]: (state, { payload }) => {
            state.albums = payload;
        },
        [hotPlaylistThunk.fulfilled]: (state, { payload }) => {
            state.playlists = payload;
        },
        [hotUserThunk.fulfilled]: (state, { payload }) => {
            state.users = payload;
        }
    },
});

export default hotSlice.reducer;