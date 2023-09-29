import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "./authSlice";

const reducers = combineReducers({
  auth: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  //It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
  middleware: [thunk],
});

export default store;
