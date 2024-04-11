// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counter-slice";
import usersSlice from "./slices/user/users-slice";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: usersSlice,
});

export default rootReducer;
