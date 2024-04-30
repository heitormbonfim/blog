import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/user-slice";
import tokensSlice from "./slices/tokens-slice";
import blogSlice from "./slices/blog-slice";
import postSlice from "./slices/post-slice";

const rootReducer = combineReducers({
  user: userSlice,
  tokens: tokensSlice,
  blog: blogSlice,
  post: postSlice,
});

export default rootReducer;
