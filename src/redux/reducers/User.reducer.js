import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: 'user',
  initialState: {
  },
  reducers: {
    loginUserAction: (state, payload) => {
      state = payload
    },
  }
});

export const { loginUserAction } = userReducer.actions;

export default userReducer.reducer;