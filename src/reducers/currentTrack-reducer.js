import {createSlice} from "@reduxjs/toolkit";
import {getTrackThunk} from "../services/thunks/track-thunk";


const song = {
    apiSongId: "1",
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    // isPlaying: false,
    artist: '',
    songName: '',
    img: ''
};

const formatTime = (ms) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const currentTrackSlice = createSlice({
    name: "currentTrack",
    initialState: { track: song, isPlaying: null },
    reducers: {
        updateIsPlaying(state, action) {
            state.isPlaying = action.payload;
            // console.log("current playing: " + JSON.stringify(state.isPlaying));
        },
        changeTrack(state, action) {
            state.track = action.payload;
            state.isPlaying = true;
            // console.log("current track: " + JSON.stringify(state.track));
        }
    },
    // extraReducers: {
    //     [getTrackThunk.fulfilled]: (state, { payload }) => {
    //         state.track.mp3Url = payload["tracks"][0]["preview_url"];
    //         state.track.img = payload["tracks"][0]["album"]["images"][0]["url"];
    //         state.track.songName =  payload["tracks"][0]["name"];
    //         state.track.artistName = payload["tracks"][0]["artists"][0]["name"];
    //         state.track.apiSongId = payload["tracks"][0]["id"];
    //         state.isPlaying = true;
    //         // console.log("current artist: " + state.track.artistName);
    //
    //         // // console.log("current payload: " + JSON.stringify(payload));
    //         // console.log("current Track: " + JSON.stringify(state.track));
    //         // console.log("current playing: " + JSON.stringify(state.isPlaying));
    //     }
    // }
});
export const { updateIsPlaying, changeTrack } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;