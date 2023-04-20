import * as searchLocalService from "../search-localAPI-service";
import {createAsyncThunk} from "@reduxjs/toolkit";
export const searchArtistThunk = createAsyncThunk(
    "api/local-artists",
    async (name) => {
        const response = await searchLocalService.searchArtists(name)
        console.log("artist-thunk: ", response)
        window.localStorage.setItem("localArtists", JSON.stringify(response.data));
        return response.data;
    }
);
