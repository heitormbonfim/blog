// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counter-slice";
import userSlice from "./slices/user/users-slice";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userSlice,
});

export default rootReducer;
