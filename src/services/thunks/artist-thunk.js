import * as searchLocalService from "../search-localAPI-service";
import {createAsyncThunk} from "@reduxjs/toolkit";
export const searchArtistThunk = createAsyncThunk(
    "api/local-artists",
    async (name) => {
      const response = await searchLocalService.searchArtists(name);
      // window.localStorage.setItem("localArtists", JSON.stringify(response.data));
      return response;
    }
);
