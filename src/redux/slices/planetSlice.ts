import { createSlice } from "@reduxjs/toolkit";

export interface planetState {
  selectedPlanet: string;
}

const initialState: planetState = {
  selectedPlanet: "",
};

export const planetSlice = createSlice({
  name: "planet",
  initialState,
  reducers: {
    selectPlanet: (state, { payload }) => {
      state.selectedPlanet = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectPlanet } = planetSlice.actions;

export default planetSlice.reducer;
