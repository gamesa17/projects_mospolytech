import { CourseDto } from "@ts/types";

import { LEVELS } from "./levels";
import { STUDENTS } from "./students";
import { TEACHERS } from "./teachers";
import { LANGUAGES } from "./languages";

type Courses = "Group01English" | "Group02French";

export const COURSES: Record<Courses, CourseDto> = {
  Group01English: {
    id: 0,
    name: "A1-A2 English Group",
    level: { ...LEVELS.Beginner },
    language: { ...LANGUAGES.English },
    teacher: TEACHERS.Alexia.id,
    students: [STUDENTS.Tom.id, STUDENTS.Alex.id],
  },
  Group02French: {
    id: 1,
    name: "B1-B2 French Group",
    level: { ...LEVELS.Intermediate },
    language: { ...LANGUAGES.French },
    teacher: TEACHERS.Alexia.id,
    students: [STUDENTS.John.id, STUDENTS.Alex.id],
  },
};
