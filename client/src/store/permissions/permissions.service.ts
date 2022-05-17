import { createSlice } from "@reduxjs/toolkit";

import { logout } from "@client/store/authorization/authorization.resources";

import { permissions } from "./permissions.resources";
import { INITIAL_STATE } from "./permissions.constants";

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(permissions.fulfilled, (state, { payload }) => {
        state.permissions = payload.data;
      })
      .addCase(logout.fulfilled, (state) => {
        state.permissions = [];
      });
  },
});

export const permissionsReducer = permissionsSlice.reducer;
