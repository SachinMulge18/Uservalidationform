import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserData = {
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserData>) {
      state.user.push(action.payload);
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
