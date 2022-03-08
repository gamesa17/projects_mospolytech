import { UserRole } from "./user.enums";

export interface User {
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}
