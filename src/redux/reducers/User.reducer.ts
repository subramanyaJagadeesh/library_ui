import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { RootState } from "../store";

const userReducer = createSlice({
  name: 'user',
  initialState: {
  } as User,
  reducers: {
    loginUserAction: (_, action: PayloadAction<User>) => {
      return action.payload
    },
  }
});

export const { loginUserAction } = userReducer.actions;

export const selectUser = (state: RootState) => state.user;

export default userReducer.reducer;