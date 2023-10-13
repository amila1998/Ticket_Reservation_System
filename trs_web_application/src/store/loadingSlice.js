//loadingSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define the loading slice for managing loading state
const loadingSlice = createSlice({
  name: "loading", // Slice name
  initialState: {
    isMainLoading: true, // Initial loading state
  },
  reducers: {
    // Set the main loading state to true
    setIsMainLoading(state, action) {
      state.isMainLoading = true;
    },
    // Remove the main loading state by setting it to false
    removeIsMainLoading(state, action) {
      state.isMainLoading = false;
    },
  },
});

// Export the loading actions
export const loadingActions = loadingSlice.actions;

// Export the loading slice
export default loadingSlice;
