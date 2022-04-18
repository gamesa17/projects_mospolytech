import React from "react";
import { UserRole } from "@ts/enums";

export type CheckUserRoleProps = React.PropsWithChildren<{
  checkValue: UserRole;
  redirectTo: string;
}>;

export type RestrictedRouteProps = React.PropsWithChildren<{
  redirectTo: string;
}>;
