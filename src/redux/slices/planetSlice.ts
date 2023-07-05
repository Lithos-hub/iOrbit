import { createSlice } from "@reduxjs/toolkit";

export interface planetState {
  selectedPlanetName: string;
  selectedScale: "real" | "same";
  selectedOrbit: "real" | "flat";
}

const initialState: planetState = {
  selectedPlanetName: "",
  selectedScale: "real",
  selectedOrbit: "real",
};

export const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    selectPlanet: (state, { payload }) => {
      state.selectedPlanetName = payload;
    },
    selectScale: (state, { payload }) => {
      state.selectedScale = payload;
    },
    selectOrbit: (state, { payload }) => {
      state.selectedOrbit = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPlanet, selectScale, selectOrbit } = planetSlice.actions;

export default planetSlice.reducer;
