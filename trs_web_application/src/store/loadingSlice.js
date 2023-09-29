import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isMainLoading:true
  },
  reducers: {
    setIsMainLoading(state, action) {
      state.isMainLoading = true;
    },
    removeIsMainLoading(state, action) {
      state.isMainLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice;
