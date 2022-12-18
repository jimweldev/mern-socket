import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'connectedUsers',
  initialState: {
    value: [],
  },
  reducers: {
    SET_CONNECTED_USERS: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { SET_CONNECTED_USERS } = userSlice.actions;
export default userSlice.reducer;
