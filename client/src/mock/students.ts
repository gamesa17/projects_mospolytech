import { User } from "@ts/types";

import { USERS } from "./users";

type Students = "Tom" | "Alex" | "John";

export const STUDENTS: Record<Students, User> = {
  Tom: USERS.Tom,
  Alex: USERS.Alex,
  John: USERS.John,
};
