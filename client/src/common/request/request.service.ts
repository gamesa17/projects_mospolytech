import axios, { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "@common/auth";
import { API_CONFIG } from "./request.constants";
import { RefreshTokenInput, RefreshTokenResponse } from "@ts/requests";
import { CustomAxiosConfig } from "./request.types";

export const $request = axios.create(API_CONFIG);

export const mockRequest = process.env.USE_MOCKS
  ? new MockAdapter($request, { delayResponse: 500, onNoMatch: "throwException" })
  : ({} as unknown as MockAdapter);

export const tokenRequestInterceptor = $request.interceptors.request.use((config) => {
  const token = AuthService.getToken();

  const useToken = !(config as CustomAxiosConfig).removeToken && token;

  const authorization = useToken ? { Authorization: `Bearer ${token}` } : {};

  return {
    ...config,
    headers: {
      ...config.headers,
      ...authorization,
    },
  };
});

export const tokenResponseInterceptor = $request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorConfig = error.config as CustomAxiosConfig;

    if (error.response?.status === StatusCodes.UNAUTHORIZED && !errorConfig.isRetry) {
      const refreshTokenConfig: CustomAxiosConfig = { removeToken: true, isRetry: true };

      const response = await $request.post<RefreshTokenInput, AxiosResponse<RefreshTokenResponse>>(
        "/auth/refresh",
        undefined,
        refreshTokenConfig
      );

      if (response.data?.accessToken) {
        AuthService.setToken(response.data.accessToken);

        errorConfig.isRetry = true;

        return $request.request(errorConfig);
      }
    }

    return error;
  }
);
