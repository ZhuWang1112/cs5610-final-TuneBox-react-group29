import {hotAlbumThunk, hotArtistThunk, hotPlaylistThunk, hotUserThunk} from "../services/thunks/hot-thunk";
import {createSlice} from "@reduxjs/toolkit";

const hotSlice = createSlice({
    name: "hot",
    initialState: { artists: [], albums: [], playlists: [], users: [], error: null },
    reducers: {},
    extraReducers: {
        [hotArtistThunk.fulfilled]: (state, { payload }) => {
            state.artists = payload;
            state.error = null;
        },
        [hotArtistThunk.rejected]: (state, action) => {
            state.error = action.error;
        },
        [hotAlbumThunk.fulfilled]: (state, { payload }) => {
            state.albums = payload;
            state.error = null;
        },
        [hotAlbumThunk.rejected]: (state, action) => {
            state.error = action.error;
        },
        [hotPlaylistThunk.fulfilled]: (state, { payload }) => {
            state.playlists = payload;
        },
        [hotUserThunk.fulfilled]: (state, { payload }) => {
            state.users = payload;
        },
    },
});

export default hotSlice.reducer;