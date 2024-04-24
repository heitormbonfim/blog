import { createSlice } from "@reduxjs/toolkit";
import { Blog } from "./user-slice";

const initialState: Blog = {} as Blog;

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCurrentBlogToEdit(state, action) {
      state = action.payload;
    },
  },
});

export const { setCurrentBlogToEdit } = blogSlice.actions;
export default blogSlice.reducer;
