import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../track-service";

export const getTrackThunk = createAsyncThunk(
    "track/getTrack",
    async (track) => await service.getTrack(track)
);