import { createSlice } from "@reduxjs/toolkit";

export interface planetState {
  selectedPlanetName: string;
  selectedScale: "real" | "same";
  selectedOrbit: "real" | "flat";
  isTracking: boolean;
}

const initialState: planetState = {
  selectedPlanetName: "",
  selectedScale: "real",
  selectedOrbit: "real",
  isTracking: false,
};

export const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    selectPlanet: (state, { payload }) => {
      state.selectedPlanetName = payload;
      state.isTracking = false;
    },
    selectScale: (state, { payload }) => {
      state.selectedScale = payload;
    },
    selectOrbit: (state, { payload }) => {
      state.selectedOrbit = payload;
    },
    toggleTracking: (state) => {
      state.isTracking = !state.isTracking;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPlanet, selectScale, selectOrbit, toggleTracking } =
  planetSlice.actions;

export default planetSlice.reducer;
