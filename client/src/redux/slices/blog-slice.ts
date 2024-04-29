import { createSlice } from "@reduxjs/toolkit";
import { Post } from "./post-slice";
export interface Blog {
  _id: string;
  name: string;
  nameId: string;
  description: string;
  ownerId: string;
  hidden: boolean;
  followers?: number;
  posts?: Post[];
}

const initialState: Blog = {} as Blog;

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCurrentBlog(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
