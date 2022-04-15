import { USERS } from "./users";
import { LANGUAGES } from "./languages";
import { Teacher } from "@ts/teacher";

type Teachers = "Alexia";

export const TEACHERS: Record<Teachers, Teacher> = {
  Alexia: {
    ...USERS.Alexia,
    id: 0,
    languages: [{ ...LANGUAGES.English }, { ...LANGUAGES.French }],
  },
};
