import { createSlice } from '@reduxjs/toolkit';

// Initial appState shape

const initialState: TAppState = {
  preferredTheme: 'dark',
  showNotifications: true,
};

export const appStateSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.preferredTheme = action.payload;
    },
    setShowNotifications: (state, action) => {
      state.showNotifications = action.payload;
    },
  },
});

export const { setTheme, setShowNotifications } = appStateSlice.actions;
export default appStateSlice.reducer;
