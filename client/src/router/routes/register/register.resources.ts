import { AxiosResponse } from "axios";
import { $request, CustomAxiosConfig } from "@common/request";
import { RegisterInput, RegisterResponse } from "@ts/requests";

export const register = (data: RegisterInput) =>
  $request.post<RegisterInput, AxiosResponse<RegisterResponse>>("/auth/register", data, {
    withToken: false,
  } as CustomAxiosConfig);
