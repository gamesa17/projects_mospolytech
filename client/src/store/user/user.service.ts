import { createSlice } from "@reduxjs/toolkit";

import { logout } from "@client/store/authorization/authorization.resources";

import { INITIAL_STATE } from "./user.constants";
import { me } from "./user.resources";

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
      });
  },
});

export const userReducer = userSlice.reducer;
