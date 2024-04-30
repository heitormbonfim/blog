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

const initialState = {
  isLoading: false,
  data: {} as Blog,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogDataLoading(state, action) {
      state.isLoading = action.payload;
    },

    setCurrentBlog(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setCurrentBlog, setBlogDataLoading } = blogSlice.actions;
export default blogSlice.reducer;
