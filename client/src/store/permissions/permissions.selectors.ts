import { RootState } from "@client/store/store.types";
import { PermissionsState } from "@client/store/permissions/permissions.types";

export const selectPermissionsRoot = (state: RootState): PermissionsState => state.permissions;
