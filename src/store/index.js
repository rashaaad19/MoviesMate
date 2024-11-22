import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./UiSlice";
import DiscoverSlice from "./DiscoverSlice";
import UserDataSlice from "./UserDataSlice";
const store = configureStore({
  reducer: {
    Ui: UiSlice.reducer,
    discover: DiscoverSlice.reducer,
    userData: UserDataSlice.reducer,
  },
});
export default store;
