import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./UiSlice";
import DiscoverSlice from "./DiscoverSlice";
const store = configureStore({
  reducer: {
    Ui: UiSlice.reducer,
    discover: DiscoverSlice.reducer,
  },
});
export default store;
