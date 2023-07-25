import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isSidemenuOpened: boolean;
  isTutorialOpened: boolean;
}

const initialState: UiState = {
  isSidemenuOpened: false,
  isTutorialOpened: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidemenu: (state) => {
      state.isSidemenuOpened = !state.isSidemenuOpened;
    },
    toggleTutorial: (state) => {
      state.isTutorialOpened = !state.isTutorialOpened;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidemenu, toggleTutorial } = uiSlice.actions;

export default uiSlice.reducer;
