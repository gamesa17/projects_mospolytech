import { Level } from "@ts/level";
import { Model } from "@ts/model";
import { Student } from "@ts/student";
import { Teacher } from "@ts/teacher";
import { Language } from "@ts/language";

export interface Course extends Model {
  name: string;
  level: Level;
  language: Language;
  teacher: Teacher;
  students: Student[];
}
