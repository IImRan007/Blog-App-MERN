import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSucess: false,
  isLoading: false,
  message: "",
};

// Register user
export const registerUser = createAsyncThunk("auth/register");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSucess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
