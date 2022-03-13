import { Model } from "@ts/model";
import { Course } from "@ts/course";

export interface Homework extends Model {
  name: string;
  description?: string;
  course: Course;
  links?: string[];
  onEveryLesson?: boolean;
  created: number;
  deadline: number;
}
