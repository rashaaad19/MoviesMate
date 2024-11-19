import { createSlice } from "@reduxjs/toolkit";

const DiscoverSlice = createSlice({
  initialState: {
    sortBy: "popularity.dsc",
    year: "all",
    genre: "all",
    language: "all",
    page: 1,
  },
  name: "discover",
  reducers: {
    changeSortBy(state, action) {
      state.sortBy = action.payload;
    },
    changeYear(state, action) {
      state.year = action.payload;
    },
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    changeGenre(state, action) {
      state.genre = action.payload;
    },
    changePage(state, action) {
      state.page = action.payload;
    },
  },
});
export const discoverActions = DiscoverSlice.actions;

export default DiscoverSlice;
