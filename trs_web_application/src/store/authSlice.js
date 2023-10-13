//store/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define the auth slice for managing authentication state
const authSlice = createSlice({
  name: "auth", // Slice name
  initialState: {
    isLoggedIn: false, // Initial login status
    token: null, // Initial token
    user: "", // Initial user information
  },
  reducers: {
    // Set user information in the state
    setInfo(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    // Log in the user and set login status and token
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    // Log out the user and reset login status, token, and user data
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = "";
      localStorage.clear();
    },
  },
});

// Export the auth actions
export const authActions = authSlice.actions;

// Export the auth slice
export default authSlice;
