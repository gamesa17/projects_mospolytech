import { Student } from "@ts/types";

export const getFullUserName = (user: Student): string => `${user.firstName} ${user.lastName}`;
