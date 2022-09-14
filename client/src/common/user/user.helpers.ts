import { User } from "@ts/types";

export const getFullUserName = (user: User): string => `${user.firstName} ${user.lastName}`;
