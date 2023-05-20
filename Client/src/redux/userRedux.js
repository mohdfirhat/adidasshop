import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isRegistering: false,
    registerError: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
    },
    resetLoginState: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    registerStart: (state) => {
      state.isRegistering = true;
      state.error = false;
    },
    registerFailure: (state) => {
      state.isRegistering = false;
      state.registerError = true;
    },
    registerSuccess: (state) => {
      state.isRegistering = false;
      state.registerError = false;
    },
  },
});

export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logOut,
  resetLoginState,
  registerStart,
  registerFailure,
  registerSuccess,
} = userSlice.actions;
export default userSlice.reducer;
