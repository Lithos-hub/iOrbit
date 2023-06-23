import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isOpenedSidemenu: boolean;
}

const initialState: UiState = {
  isOpenedSidemenu: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidemenu: (state) => {
      state.isOpenedSidemenu = !state.isOpenedSidemenu;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidemenu } = uiSlice.actions;

export default uiSlice.reducer;
