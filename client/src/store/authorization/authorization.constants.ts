import { AuthorizationService } from "@common/authorization";
import { AuthorizationState } from "./authorization.types";

export const INITIAL_STATE: AuthorizationState = {
  authorized: !!AuthorizationService.accessToken,
  checkingAuthorization: !!AuthorizationService.accessToken,
};
