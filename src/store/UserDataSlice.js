import { createSlice } from "@reduxjs/toolkit";

const UserDataSlice = createSlice({
  initialState: {
    userCredentials: {
      email: "",
      name: "",
    },
    favMovies: [],
  },
  name: "userData",
  reducers: {
    updateUserCredentials(state, action) {
      state.userCredentials = action.payload;
    },
    toggleHello(state) {
      state.favMovies = [...state.favMovies, "hello"];
    },
  },
});

export const userDataActions = UserDataSlice.actions;
export default UserDataSlice;
