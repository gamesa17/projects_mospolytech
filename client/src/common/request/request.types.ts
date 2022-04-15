import { AxiosRequestConfig } from "axios";

export type CustomAxiosConfig = AxiosRequestConfig & {
  isRetry?: boolean;
  withToken?: boolean;
};
