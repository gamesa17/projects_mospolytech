import { RefreshTokenInput, RefreshTokenResponse } from "@ts/requests";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { StatusCodes } from "http-status-codes";
import { AuthorizationAxiosConfig } from "./authorization.types";

export class AuthorizationService {
  private static readonly LOCAL_STORAGE_ACCESS_TOKEN_KEY = "accessToken";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static readonly refreshToken = async (axiosInstance: AxiosInstance): Promise<string | undefined> => {
    try {
      const response = await axiosInstance.post<RefreshTokenInput, AxiosResponse<RefreshTokenResponse>>(
        "/auth/refresh",
        undefined,
        { withToken: false, isRetry: true } as AuthorizationAxiosConfig
      );

      AuthorizationService.accessToken = response.data.accessToken;

      return AuthorizationService.accessToken;
    } catch (err) {
      return undefined;
    }
  };

  public static axiosBearerInterceptorId: number | undefined;

  public static axiosUnauthorizedInterceptorId: number | undefined;

  public static set accessToken(newAccessToken: string | undefined) {
    if (newAccessToken) {
      localStorage.setItem(AuthorizationService.LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
    } else {
      localStorage.removeItem(AuthorizationService.LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    }
  }

  public static get accessToken(): string | undefined {
    const token = localStorage.getItem(AuthorizationService.LOCAL_STORAGE_ACCESS_TOKEN_KEY);

    if (!token) {
      return undefined;
    }

    return token;
  }

  public static readonly axiosBearerInterceptor = (config: AuthorizationAxiosConfig): AuthorizationAxiosConfig => {
    const token = AuthorizationService.accessToken;

    const withToken = config.withToken !== false && token;

    const authorization = { Authorization: withToken ? `Bearer ${token}` : "" };

    return {
      ...config,
      headers: {
        ...config.headers,
        ...authorization,
      },
    };
  };

  public static readonly axiosUnauthorizedInterceptor = async (
    axiosInstance: AxiosInstance,
    error: AxiosError
  ): Promise<AxiosResponse> => {
    const errorConfig = error.config as AuthorizationAxiosConfig;

    if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
      throw error;
    }

    if (errorConfig.isRetry) {
      // Чтобы разлогинить пользователя после неудачной попытки рефреша токена
      window.location.reload();

      throw error;
    }

    const newAccessToken = await AuthorizationService.refreshToken(axiosInstance);

    if (!newAccessToken) {
      throw error;
    }

    errorConfig.isRetry = true;

    return await axiosInstance.request(errorConfig);
  };
}