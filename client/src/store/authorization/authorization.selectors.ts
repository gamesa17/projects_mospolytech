import { RootState } from "@client/store/store.types";
import { AuthorizationState } from "@client/store/authorization/authorization.types";

const selectAuthorizationRoot = (state: RootState): AuthorizationState => state.authorization;

export const selectAuthorized = (state: RootState): boolean => selectAuthorizationRoot(state).authorized;

export const selectCheckingAuthorized = (state: RootState): boolean =>
  selectAuthorizationRoot(state).checkingAuthorization;
