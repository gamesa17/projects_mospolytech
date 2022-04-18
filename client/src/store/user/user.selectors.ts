import { RootState } from "@client/store/store.types";
import { UserState } from "@client/store/user/user.types";

import { UserRole } from "@ts/enums";
import { User } from "@ts/types";

const selectUserRoot = (state: RootState): UserState => state.user;

export const selectUser = (state: RootState): User | undefined => selectUserRoot(state).user;

export const selectUserRole = (state: RootState): UserRole | undefined => selectUserRoot(state).user?.role;
