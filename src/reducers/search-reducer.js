import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        // refreshing or navigating back to the search screen remembers the result.
        searchContent: localStorage.getItem("searchContent") || "",
        searchResults: JSON.parse(localStorage.getItem("searchResults")) || [],
        searchType: localStorage.getItem("searchType") || "search-remote-albums",
    },
    reducers: {
        updateSearchContent(state, action) {
            state.searchContent = action.payload;
            localStorage.setItem("searchContent", action.payload);
        },
        updateSearchResults(state, action) {
            state.searchResults = action.payload;
            localStorage.setItem("searchResults", JSON.stringify(action.payload));
        },
        updateSearchType(state, action) {
            state.searchType = action.payload;
            localStorage.setItem("searchType", action.payload);
        },
        cleanSearchReducer(state, action) {
            state.searchContent = "";
            state.searchResults = [];
            state.searchType = "search-remote-albums";
        },
    }
});

export const {updateSearchContent, updateSearchResults, updateSearchType, cleanSearchReducer} = searchSlice.actions;
export default searchSlice.reducer;
