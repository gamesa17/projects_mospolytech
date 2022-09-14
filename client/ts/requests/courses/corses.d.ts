import { Course, CourseDto } from "@ts/types";

export type CreateCourseInput = Partial<Course>;

export type CreateCourseResponse = CourseDto;

export type GetCoursesInput = undefined;

export type GetCoursesResponse = CourseDto[];

export type UpdateCourseInput = Partial<Course>;

export type UpdateCourseResponse = CourseDto;

export type DeleteCourseInput = {
  courseId: number;
};

export type DeleteCourseResponse = undefined;
