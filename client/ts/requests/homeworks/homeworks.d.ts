import { HomeworkDto } from "@ts/types";

export type CreateHomeworkInput = Partial<Homework>;

export type CreateHomeworkResponse = HomeworkDto;

export type GetHomeworksInput = undefined;

export type GetHomeworksResponse = HomeworkDto[];

export type UpdateHomeworkInput = Partial<Homework>;

export type UpdateHomeworkResponse = HomeworkDto;

export type DeleteHomeworkInput = {
  homeworkId: number;
};

export type DeleteHomeworkResponse = undefined;
