import { createSlice } from '@reduxjs/toolkit';

const initialState: TAuthState = {
  user: null,
  auth: null,
  firstTimer: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.auth = action.payload.auth;
      if (state.firstTimer) {
        state.firstTimer = false;
      }
    },
    logOut: (state) => {
      state.user = null;
      state.auth = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
