import { createSlice } from "@reduxjs/toolkit";

export interface planetState {
  selectedPlanet: string;
  selectedScale: "real" | "same";
}

const initialState: planetState = {
  selectedPlanet: "",
  selectedScale: "real",
};

export const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    selectPlanet: (state, { payload }) => {
      state.selectedPlanet = payload;
    },
    selectScale: (state, { payload }) => {
      state.selectedScale = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPlanet, selectScale } = planetSlice.actions;

export default planetSlice.reducer;
