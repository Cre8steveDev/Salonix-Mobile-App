import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// This configuration tells Redux Toolkit's serializable state check middleware to ignore these Redux Persist actions, which are not serializable by default.
// Including these actions helps prevent warnings or errors related to non-serializable values in Redux state or actions, which can occur when using Redux Persist.
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your reducers here
import authReducer from './authSlice';
import appStateReducer from './appStateSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Combine the reducers from the slices
const rootReducer = combineReducers({
  auth: authReducer,
  app: appStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
