import { User } from "@ts/types";

import { USERS } from "./users";

type Teachers = "Alexia" | "Jessica";

export const TEACHERS: Record<Teachers, User> = {
  Alexia: USERS.Alexia,
  Jessica: USERS.Jessica,
};
