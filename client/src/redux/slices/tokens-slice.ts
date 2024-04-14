import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: localStorage.getItem("auth") || "",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = tokensSlice.actions;
export default tokensSlice.reducer;
