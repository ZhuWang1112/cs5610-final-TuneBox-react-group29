import {createAsyncThunk} from "@reduxjs/toolkit";
import * as searchLocalService from "../search-localAPI-service";

export const searchSongThunk = createAsyncThunk(
    "api/local-songs",
    async (name) => {
      const response = await searchLocalService.searchSongs(name);
      // window.localStorage.setItem("localSongs", JSON.stringify(response.data));
      return response;
    }
);