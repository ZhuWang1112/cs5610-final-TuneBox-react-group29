import {createSlice} from "@reduxjs/toolkit";
import {getTrackThunk} from "../services/thunks/track-thunk";


const song = {
    apiSongId: "1",
    mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    isPlaying: false,
    artist: 'Artist Name',
    songName: 'Song Title',
    img: 'https://example.com/song.jpg'
};

const currentTrackSlice = createSlice({
    name: "currentTrack",
    initialState: { track: song, isPlaying: null },
    reducers: {
        updateIsPlaying(state, action) {
            state.isPlaying = action.payload;
            // console.log("current playing: " + JSON.stringify(state.isPlaying));
        }
    },
    extraReducers: {
        [getTrackThunk.fulfilled]: (state, { payload }) => {
            state.track.mp3Url = payload["tracks"][0]["preview_url"];
            state.track.img = payload["tracks"][0]["album"]["images"][0]["url"];
            state.track.songName =  payload["tracks"][0]["name"];
            state.track.artistName = payload["tracks"][0]["artists"][0]["name"];
            state.track.apiSongId = payload["tracks"][0]["id"];
            state.isPlaying = true;
            console.log("current artist: " + state.track.artistName);

            // // console.log("current payload: " + JSON.stringify(payload));
            // console.log("current Track: " + JSON.stringify(state.track));
            // console.log("current playing: " + JSON.stringify(state.isPlaying));
        }
    }
});
export const { updateIsPlaying } = currentTrackSlice.actions;
export default currentTrackSlice.reducer;