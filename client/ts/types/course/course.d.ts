import { Level, Model, ModelId, Language } from "@ts/types";

export interface Course extends Model {
  name: string;
  level: ModelId;
  language: ModelId;
  teacher: ModelId;
  students: ModelId[];
}

export interface CourseDto extends Omit<Course, "level" | "language"> {
  level: Level;
  language: Language;
}
