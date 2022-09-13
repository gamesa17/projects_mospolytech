import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import {
  GetLanguagesInput,
  GetLanguagesResponse,
  GetLevelsInput,
  GetLevelsResponse,
  GetUsersInput,
  GetUsersResponse,
} from "@ts/requests";

export const getLevels = () => Request.instance.get<GetLevelsInput, AxiosResponse<GetLevelsResponse>>("/levels");

export const getLanguages = () =>
  Request.instance.get<GetLanguagesInput, AxiosResponse<GetLanguagesResponse>>("/languages");

export const getStudents = (courseId: number, skip: number, limit: number) =>
  Request.instance.get<GetUsersInput, AxiosResponse<GetUsersResponse>>(
    `/users/profiles?courseId=${courseId}&skip=${skip}&limit=${limit}`
  );
