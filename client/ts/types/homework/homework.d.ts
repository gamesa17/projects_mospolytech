import { Course, CourseDto, Model } from "@ts/types";

export interface Homework extends Model {
  course: Course;

  name: string;
  description?: string;
  link?: string;

  isOnEveryLesson?: boolean;

  createdAt: string;
  deadlineAt: string;
}

export interface HomeworkDto extends Omit<Homework, "course"> {
  course: CourseDto;
}
