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

    refreshTokenSuccess: (state, action) => {
      state.auth = action.payload;
    },

    logOut: (state) => {
      state.user = null;
      state.auth = null;
    },
  },
});

export const { loginSuccess, refreshTokenSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
