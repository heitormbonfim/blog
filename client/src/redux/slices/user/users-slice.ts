// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.data = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.data = null;
    },
  },
});

export const { loginSuccess, logout, setLoading } = userSlice.actions;

export default userSlice.reducer;
