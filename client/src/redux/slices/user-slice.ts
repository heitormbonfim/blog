import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "./blog-slice";

export interface User {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  role: string;
  blogs: Blog[];
  created_at?: Date;
  updated_at?: Date;
}

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  data: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDataLoading(state, action) {
      state.isLoading = action.payload;
    },

    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.data = action.payload;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.data = {} as User;
    },

    setBlogs(state, action) {
      state.data.blogs = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUserDataLoading, setBlogs } = userSlice.actions;

export default userSlice.reducer;
