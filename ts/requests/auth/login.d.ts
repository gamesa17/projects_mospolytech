import { User } from "@ts/user";

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};
