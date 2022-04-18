import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationService } from "@common/authorization";

import { me } from "../user/user.resources";

import { INITIAL_STATE } from "./authorization.constants";
import { login, logout } from "./authorization.resources";

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState: INITIAL_STATE,
  reducers: {
    updateAuthorized(state, action: PayloadAction<boolean>) {
      state.authorized = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        if (!payload.data || !payload.data.accessToken) {
          return;
        }

        const { accessToken } = payload.data;

        AuthorizationService.accessToken = accessToken;

        state.authorized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        AuthorizationService.accessToken = undefined;

        state.authorized = false;
      })
      .addCase(me.fulfilled, (state) => {
        state.authorized = true;
        state.checkingAuthorization = false;
      })
      .addCase(me.rejected, (state) => {
        state.authorized = false;
        state.checkingAuthorization = false;

        AuthorizationService.accessToken = undefined;
      }),
});

export const authorizationReducer = authorizationSlice.reducer;
export const { updateAuthorized } = authorizationSlice.actions;
