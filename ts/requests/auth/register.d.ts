import { UserRole } from "@ts/user";

export type RegisterInput = {
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type RegisterResponse = {};
