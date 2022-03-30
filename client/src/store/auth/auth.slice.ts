import { AuthService } from "@common/auth";
import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./auth.constants";
import { login, logout } from "./auth.resources";

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (!payload || !payload.accessToken) {
        return;
      }

      const { accessToken } = payload;

      AuthService.setToken(accessToken);

      state.authorized = true;
      state.token = accessToken;
    });

    builder.addCase(logout.fulfilled, (state) => {
      AuthService.setToken(undefined);

      state.authorized = false;
      state.token = undefined;
    });
  },
});

export const authReducer = authSlice.reducer;
