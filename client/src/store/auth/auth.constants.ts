import { AuthService } from "@common/auth";
import { AuthState } from "./auth.types";

export const INITIAL_STATE: AuthState = {
  authorized: !!AuthService.getToken(),
  token: AuthService.getToken(),
};
