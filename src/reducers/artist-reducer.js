import { searchArtistThunk } from "../services/thunks/artist-thunk.js";
import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
  name: "artist",
  initialState: { _id: null, name: "", img: "", api: "", __v: 0, error: null },
  reducers: {},
  // extraReducers: {
  //   [searchArtistThunk.fulfilled]: (state, action) => {
  //     state.name = action.payload;
  //   },
  // },
});

export default artistSlice.reducer;
