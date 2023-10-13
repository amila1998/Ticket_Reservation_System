//store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";

// Combine reducers for the store
const reducers = combineReducers({
  auth: authSlice.reducer,
  loading: loadingSlice.reducer,
});

// Configuration for data persistence
const persistConfig = {
  key: "root",
  storage: localStorage, // Storage method for data persistence
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: [thunk], // Middleware for async operations
});

export default store;




