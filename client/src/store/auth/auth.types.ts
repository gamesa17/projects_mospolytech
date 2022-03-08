import { RootState } from "../store.types";

export interface AuthState {
  authorized: boolean;
  token?: string;
}

export interface ThunkApiConfig {
  state: RootState;
}
