import { Model } from "@ts/types";
import { UserRole } from "@ts/enums";

export interface User extends Model {
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}
