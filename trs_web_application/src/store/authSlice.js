import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    user: "",
  },
  reducers: {
    setInfo(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = "";
      localStorage.clear()
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
