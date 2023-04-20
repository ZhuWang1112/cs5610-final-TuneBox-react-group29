// import {hotAlbumThunk, hotArtistThunk, hotPlaylistThunk, hotUserThunk} from "../services/thunks/hot-thunk";
import { searchArtistThunk } from "../services/thunks/artist-thunk.js"
import {createSlice} from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name: "artist",
    initialState: { _id: null, name: "", img: "", api: "", __v: 0, error: null },
    reducers: {},
    extraReducers: {
        [searchArtistThunk.fulfilled]: (state, action) => {
            state.name = action.payload;
            // state.error = null;
        },
        // [searchArtistThunk.rejected]: (state, action) => {
        //     state.error = action.error;
        // },
        // [hotAlbumThunk.fulfilled]: (state, { payload }) => {
        //     state.albums = payload;
        //     state.error = null;
        // },
        // [hotAlbumThunk.rejected]: (state, action) => {
        //     state.error = action.error;
        // },
        // [hotPlaylistThunk.fulfilled]: (state, { payload }) => {
        //     state.playlists = payload;
        // },
        // [hotUserThunk.fulfilled]: (state, { payload }) => {
        //     state.users = payload;
        // },
    },
});

export default artistSlice.reducer;