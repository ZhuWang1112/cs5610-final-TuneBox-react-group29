import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {searchContent: "", searchResults: []},
    reducers: {
        updateSearchContent(state, action) {
            state.searchContent = action.payload;
        },
        updateSearchResults(state, action) {
            state.searchResults = action.payload;
        }
    }
});

export const {updateSearchContent, updateSearchResults} = searchSlice.actions;
export default searchSlice.reducer;
