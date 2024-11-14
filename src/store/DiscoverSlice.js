import { createSlice } from "@reduxjs/toolkit";

const DiscoverSlice = createSlice({
  initialState: {
    sortBy: "primary_release_date.desc",
  },
  name: "discover",
  reducers: {
    changeSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});
export const discoverActions = DiscoverSlice.actions;

export default DiscoverSlice;
