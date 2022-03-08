import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "@common/auth";
import { emptyHandler } from "@common/emptyHandler";
import { API_CONFIG } from "./api.constants";

export const $api = axios.create(API_CONFIG);

export const tokenRequestInterceptor = $api.interceptors.request.use((config) => {
  const token = AuthService.getToken();

  const authorization = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  return {
    ...config,
    headers: {
      ...config.headers,
      ...authorization,
    },
  };
});

export const tokenResponseInterceptor = $api.interceptors.response.use(emptyHandler, (error) => {
  if (error.response.status === StatusCodes.UNAUTHORIZED) {
    // TODO: Add refresh token request here
  }

  return Promise.reject(error);
});
