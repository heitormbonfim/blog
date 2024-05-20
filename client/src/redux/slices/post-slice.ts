import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  _id: string;
  title: string;
  summary: string;
  nameId: string;
  blogId: string;
  content: string;
  author: string;
  views: number;
  shares: number;
  comments: number;
  hidden: boolean;
  createdAt: string;
  updatedAt: string;
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

    incrementView(state, action) {
      state.data.views = action.payload;
    },
  },
});

export const { setPost, setPostDataLoading, incrementView } = postSlice.actions;
export default postSlice.reducer;
