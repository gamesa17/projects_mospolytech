import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "@common/api";
import { LoginInput, LoginResponse } from "@ts/requests/auth/login";
import { LogoutInput, LogoutResponse } from "@ts/requests/auth/logout";
import { RegisterInput, RegisterResponse } from "@ts/requests/auth/register";
import { ThunkApiConfig } from "../store.types";

export const register = createAsyncThunk<RegisterResponse, RegisterInput, ThunkApiConfig>("auth/register", (data) =>
  $api.post<RegisterInput, AxiosResponse<RegisterResponse>>("/register", data).then((response) => response.data)
);

export const login = createAsyncThunk<LoginResponse, LoginInput, ThunkApiConfig>("auth/login", (data) =>
  $api.post<LoginInput, AxiosResponse<LoginResponse>>("/login", data).then((response) => response.data)
);

export const logout = createAsyncThunk<LogoutResponse, LogoutInput, ThunkApiConfig>("auth/logout", () =>
  $api.post<LogoutInput, AxiosResponse<LogoutResponse>>("/logout").then((response) => response.data)
);
