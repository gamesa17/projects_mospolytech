import { Level, Model, ModelId, Language, User } from "@ts/types";

export interface Course extends Model {
  name: string;
  level: Level;
  language: Language;
  teacher: User;
  students: User[];
}

export interface CourseDto extends Omit<Course, "teacher" | "students"> {
  teacher: ModelId;
  students: ModelId[];
}
