import { createSlice } from '@reduxjs/toolkit';

const initialState: TAuthState = {
  user: null,
  firstTimer: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      if (state.firstTimer) {
        state.firstTimer = false;
      }
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
