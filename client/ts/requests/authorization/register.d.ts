import { UserRole } from "@ts/types";

export type RegisterInput = {
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type RegisterResponse = {};
