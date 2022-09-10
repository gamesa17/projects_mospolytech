import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import { GetCoursesInput, GetCoursesResponse } from "@ts/requests";

export const getCourses = () =>
  Request.instance
    .get<GetCoursesInput, AxiosResponse<GetCoursesResponse>>("/courses")
    .then(({ data, status }) => ({ data, status }));
