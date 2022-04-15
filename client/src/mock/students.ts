import { USERS } from "./users";
import { Student } from "@ts/student";

type Students = "Tom" | "Alex" | "John";

export const STUDENTS: Record<Students, Student> = {
  Tom: {
    ...USERS.Tom,
    id: 0,
  },
  Alex: {
    ...USERS.Alex,
    id: 1,
  },
  John: {
    ...USERS.John,
    id: 2,
  },
};
