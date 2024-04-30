import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  _id: string;
  nameId: string;
  blogId: string;
  content: string;
  author: string;
  likes?: number;
  shares?: number;
  comments?: number;
  hidden?: boolean;
}

const initialState = {
  isLoading: false,
  data: {} as Post,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost(state, action) {
      state.data = action.payload;
    },

    setPostDataLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setPost, setPostDataLoading } = postSlice.actions;
export default postSlice.reducer;
