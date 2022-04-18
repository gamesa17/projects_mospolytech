import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Request } from "@common/request";
import { AuthorizationAxiosConfig } from "@common/authorization";

import { LoginInput, LoginResponse, LogoutInput, LogoutResponse } from "@ts/requests";

export const login = createAsyncThunk("auth/login", (data: LoginInput) =>
  Request.instance
    .post<LoginInput, AxiosResponse<LoginResponse>>("/auth/login", data, {
      withToken: false,
    } as AuthorizationAxiosConfig)
    .then(({ data, status }) => ({ data, status }))
);

export const logout = createAsyncThunk("auth/logout", () =>
  Request.instance
    .post<LogoutInput, AxiosResponse<LogoutResponse>>("/auth/logout", undefined, {
      withToken: false,
    } as AuthorizationAxiosConfig)
    .then(({ data, status }) => ({ data, status }))
);
