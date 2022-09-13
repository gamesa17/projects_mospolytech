import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import { GetUserInput, GetUserResponse, UpdateUserInput, UpdateUserResponse } from "@ts/requests";

export const getUser = (id: number) =>
  Request.instance.get<GetUserInput, AxiosResponse<GetUserResponse>>(`/users/${id}/profile`);

export const updateUser = (id: number, data: UpdateUserInput) =>
  Request.instance.put<UpdateUserInput, AxiosResponse<UpdateUserResponse>>(`/users/${id}/profile`, data);
