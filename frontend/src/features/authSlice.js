import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: JSON.parse(localStorage.getItem('auth')),
  },
  reducers: {
    LOGIN: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.value = null;
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
