import { Model } from "@ts/model";
import { UserRole } from "./user.enums";

export interface User extends Model {
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}
