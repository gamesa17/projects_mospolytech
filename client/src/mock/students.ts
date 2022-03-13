import { USERS } from "./users";
import { Student } from "@ts/student";

type Students = "Tom" | "Alex" | "John";

export const STUDENTS: Record<Students, Student> = {
  Tom: {
    id: 0,
    user: { ...USERS.Tom },
  },
  Alex: {
    id: 1,
    user: { ...USERS.Alex },
  },
  John: {
    id: 2,
    user: { ...USERS.John },
  },
};
