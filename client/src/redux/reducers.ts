// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter-slice";
import userSlice from "./slices/user-slice";
import tokensSlice from "./slices/tokens-slice";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userSlice,
  tokens: tokensSlice,
});

export default rootReducer;
