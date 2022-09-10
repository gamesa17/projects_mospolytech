import { Model } from "@ts/types";
import { UserRole } from "@ts/enums";

export interface User extends Model {
  username: string;

  role: UserRole;

  avatar?: string;
  firstName?: string;
  lastName?: string;

  city?: string;
  phone?: string;
}
