import { Model, Language } from "@ts/types";
import { UserRole } from "@ts/enums";

export interface User extends Model {
  username: string;

  role: UserRole;

  avatar?: string;
  firstName?: string;
  lastName?: string;

  email?: string;
  phone?: string;

  languages: Language[];
}
