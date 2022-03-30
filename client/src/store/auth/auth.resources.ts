import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $request } from "@common/request";
import { LoginInput, LoginResponse, LogoutInput, LogoutResponse, RegisterInput, RegisterResponse } from "@ts/requests";
import { ThunkApiConfig } from "../store.types";

export const register = createAsyncThunk<RegisterResponse, RegisterInput, ThunkApiConfig>("auth/register", (data) =>
  $request
    .post<RegisterInput, AxiosResponse<RegisterResponse>>("/auth/register", data)
    .then((response) => response.data)
);

export const login = createAsyncThunk<LoginResponse, LoginInput, ThunkApiConfig>("auth/login", (data) =>
  $request.post<LoginInput, AxiosResponse<LoginResponse>>("/auth/login", data).then((response) => response.data)
);

export const logout = createAsyncThunk<LogoutResponse, LogoutInput, ThunkApiConfig>("auth/logout", () =>
  $request.post<LogoutInput, AxiosResponse<LogoutResponse>>("/auth/logout").then((response) => response.data)
);
