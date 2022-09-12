import { User } from "@ts/types";

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};
