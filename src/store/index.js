import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./UiSlice";
const store = configureStore({
    reducer:{
        Ui: UiSlice.reducer,

    }
})
export default store;