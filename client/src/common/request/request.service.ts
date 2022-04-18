import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { AuthorizationService } from "@common/authorization";

export class Request {
  private static readonly baseURL = "/api/v1/";
  private static readonly withCredentials = true;
  private static readonly useMocks = process.env.USE_MOCKS;
  private static readonly mocksDelayResponse = 500;
  private static readonly mocksOnNoMatch?: "passthrough" | "throwException" = "throwException";

  private static mockAdapter: MockAdapter | undefined;
  private static axiosInstance: AxiosInstance | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static readonly initAxiosInstance = (): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: Request.baseURL,
      withCredentials: Request.withCredentials,
    });

    AuthorizationService.axiosBearerInterceptorId = axiosInstance.interceptors.request.use(
      AuthorizationService.axiosBearerInterceptor
    );

    AuthorizationService.axiosUnauthorizedInterceptorId = axiosInstance.interceptors.response.use(
      async (response) => response,
      AuthorizationService.axiosUnauthorizedInterceptor.bind(null, axiosInstance)
    );

    return axiosInstance;
  };

  public static get instance(): AxiosInstance {
    if (!Request.axiosInstance) {
      Request.axiosInstance = Request.initAxiosInstance();
    }

    return Request.axiosInstance;
  }

  public static get mock(): MockAdapter | undefined {
    if (!Request.useMocks) {
      return undefined;
    }

    if (!Request.mockAdapter) {
      Request.mockAdapter = new MockAdapter(Request.instance, {
        delayResponse: Request.mocksDelayResponse,
        onNoMatch: Request.mocksOnNoMatch,
      });
    }

    return Request.mockAdapter;
  }
}
