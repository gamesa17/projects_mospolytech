import { UserRole } from "@ts/enums";

export type RegisterInput = {
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type RegisterResponse = {};
