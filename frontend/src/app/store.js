import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/authSlice';
import connectedUserReducer from '../features/connectedUserSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    connectedUsers: connectedUserReducer,
  },
});
