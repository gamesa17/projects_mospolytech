import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import { GetHomeworksInput, GetHomeworksResponse } from "@ts/requests";

export const getHomeworks = () =>
  Request.instance
    .get<GetHomeworksInput, AxiosResponse<GetHomeworksResponse>>("/homeworks")
    .then(({ data, status }) => ({ data, status }));
