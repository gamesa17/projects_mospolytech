import { AxiosRequestConfig } from "axios";

export type CustomAxiosConfig = AxiosRequestConfig & {
  isRetry?: boolean;
  removeToken?: boolean;
};
