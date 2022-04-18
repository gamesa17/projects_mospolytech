import { AxiosRequestConfig } from "axios";

export type AuthorizationAxiosConfig = AxiosRequestConfig & {
  isRetry?: boolean;
  withToken?: boolean;
};
