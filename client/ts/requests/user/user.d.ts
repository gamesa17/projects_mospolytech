import { ShortUserDto, User } from "@ts/types";

export type GetUserInput = undefined;

export type GetUserResponse = User;

export type UpdateUserInput = {
  avatar?: string;
  firstName?: string;
  lastName?: string;

  city?: string;
  phone?: string;
};

export type UpdateUserResponse = User;

export type GetUsersInput = {
  courseId: number;
  skip: number;
  limit: number;
};

export type GetUsersResponse = User[];

export type GetSearchUsersInput = {
  search?: string;
};

export type GetSearchUsersResponse = ShortUserDto[];
