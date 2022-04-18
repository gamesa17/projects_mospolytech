import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import { AuthorizationAxiosConfig } from "@common/authorization";
import { RegisterInput, RegisterResponse } from "@ts/requests";

export const register = (data: RegisterInput) =>
  Request.instance.post<RegisterInput, AxiosResponse<RegisterResponse>>("/auth/register", data, {
    withToken: false,
  } as AuthorizationAxiosConfig);
