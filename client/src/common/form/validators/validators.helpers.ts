import { USERNAME_ACCEPTED_SYMBOLS } from "./validators.constants";

export const isValidUsername = (username: string): boolean =>
  username.split("").every((s) => USERNAME_ACCEPTED_SYMBOLS.includes(s));
