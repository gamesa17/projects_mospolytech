import { RootState } from "../store.types";

export const selectAuthorized = (state: RootState) => state.auth.authorized;
