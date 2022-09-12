import { Course, Model } from "@ts/types";

export interface Homework extends Model {
  name: string;
  description?: string;
  course: Course;
  link?: string;
  onEveryLesson?: boolean;
  created: number;
  deadline: number;
}
