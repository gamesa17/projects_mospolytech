import { Teacher } from "@ts/types";

import { USERS } from "./users";
import { LANGUAGES } from "./languages";

type Teachers = "Alexia";

export const TEACHERS: Record<Teachers, Teacher> = {
  Alexia: {
    ...USERS.Alexia,
    id: 0,
    languages: [{ ...LANGUAGES.English }, { ...LANGUAGES.French }],
  },
};
