import { User } from "@ts/types";
import { RootState } from "../store.types";

export type UserState = {
  user?: User;
};

export interface ThunkApiConfig {
  state: RootState;
}
