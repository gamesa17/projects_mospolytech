import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { $request, CustomAxiosConfig } from "@common/request";
import { LoginInput, LoginResponse, LogoutInput, LogoutResponse } from "@ts/requests";

export const login = createAsyncThunk("auth/login", (data: LoginInput) =>
  $request
    .post<LoginInput, AxiosResponse<LoginResponse>>("/auth/login", data, { withToken: false } as CustomAxiosConfig)
    .then(({ data, status }) => ({ data, status }))
);

export const logout = createAsyncThunk("auth/logout", () =>
  $request
    .post<LogoutInput, AxiosResponse<LogoutResponse>>("/auth/logout", undefined, {
      withToken: false,
    } as CustomAxiosConfig)
    .then(({ data, status }) => ({ data, status }))
);
