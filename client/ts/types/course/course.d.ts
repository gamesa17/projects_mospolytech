import { Level, Model, Student, Teacher, Language } from "@ts/types";

export interface Course extends Model {
  name: string;
  level: Level;
  language: Language;
  teacher: Teacher;
  students: Student[];
}

export interface CourseDto extends Model {
  name: string;
  level: Level;
  language: Language;
  teacher: number;
  students: number[];
}
