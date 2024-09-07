import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
    initialState:{
        fullPageNav:false,
    },
    name:'Ui',
    reducers:{
        toggleNav(state){
            state.fullPageNav=!state.fullPageNav
        }
    }
})

export const UiActions = UiSlice.actions;
export default UiSlice