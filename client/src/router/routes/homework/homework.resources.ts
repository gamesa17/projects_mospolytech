import { AxiosResponse } from "axios";
import { Request } from "@common/request";
import {
  CreateHomeworkInput,
  CreateHomeworkResponse,
  DeleteCourseInput,
  DeleteCourseResponse,
  GetHomeworksInput,
  GetHomeworksResponse,
  UpdateHomeworkInput,
  UpdateHomeworkResponse,
} from "@ts/requests";
import { Homework, ModelId } from "@ts/types";

export const getHomeworks = () =>
  Request.instance.get<GetHomeworksInput, AxiosResponse<GetHomeworksResponse>>("/homeworks");

export const createHomework = (homework: Omit<Homework, "id">) =>
  Request.instance.post<CreateHomeworkInput, AxiosResponse<CreateHomeworkResponse>>(`/homeworks`, homework);

export const updateHomework = (homeworkId: ModelId, updateData: Partial<Homework>) =>
  Request.instance.put<UpdateHomeworkInput, AxiosResponse<UpdateHomeworkResponse>>(
    `/homeworks/${homeworkId}`,
    updateData
  );

export const deleteHomework = (homeworkId: ModelId) =>
  Request.instance.delete<DeleteCourseInput, AxiosResponse<DeleteCourseResponse>>(`/homeworks/${homeworkId}`);
