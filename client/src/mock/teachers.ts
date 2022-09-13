import { Teacher } from "@ts/types";

import { USERS } from "./users";
import { LANGUAGES } from "./languages";

type Teachers = "Alexia" | "Jessica";

export const TEACHERS: Record<Teachers, Teacher> = {
  Alexia: {
    ...USERS.Alexia,
    id: 0,
    languages: [{ ...LANGUAGES.English }, { ...LANGUAGES.French }],
  },
  Jessica: {
    ...USERS.Jessica,
    id: 1,
    languages: [{ ...LANGUAGES.English }],
  },
};
