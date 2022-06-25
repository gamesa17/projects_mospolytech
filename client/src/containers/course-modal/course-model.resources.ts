import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import { GetLanguagesInput, GetLanguagesResponse, GetLevelsInput, GetLevelsResponse } from "@ts/requests";

export const getLevels = () => Request.instance.get<GetLevelsInput, AxiosResponse<GetLevelsResponse>>("/levels");

export const getLanguages = () =>
  Request.instance.get<GetLanguagesInput, AxiosResponse<GetLanguagesResponse>>("/languages");
