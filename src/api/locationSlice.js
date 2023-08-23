import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allLocations: [],
  currentLocation: [],
  arrayIds: [],
  currentId: 0,
};
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation(state, action) {
      if (state.allLocations.length === 0) {
        state.allLocations.push([action.payload.latitude, action.payload.longitude]);
      }
      if (state.allLocations.every((location) => location.id !== action.payload.id)) {
        state.allLocations.push([action.payload.latitude, action.payload.longitude]);
      }
    },
    addCurrentLocation(state, action) {
      if (state.currentLocation.length === 0) {
        state.currentLocation.push([action.payload.latitude, action.payload.longitude]);
        state.currentId = action.payload.id;
      }
    },
    addArrayIds(state, action) {
      if (state.arrayIds.length === 0) {
        state.arrayIds.push(action.payload);
      }
      if (!state.arrayIds.includes(action.payload)) {
        state.arrayIds.push(action.payload);
      }
    },
  },
});

export const { addLocation, addCurrentLocation, addArrayIds } = locationSlice.actions;
export default locationSlice.reducer;
