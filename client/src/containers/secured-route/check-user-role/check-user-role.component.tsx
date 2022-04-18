import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "@client/store";
import { selectUserRole } from "@client/store/user";

import { UserRole } from "@ts/enums";

import { CheckUserRoleProps, RestrictedRouteProps } from "./check-user-role.types";

const CheckUserRole: React.FC<CheckUserRoleProps> = ({ checkValue, redirectTo, children }) => {
  const userRole = useSelector(selectUserRole);

  if (userRole !== checkValue) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export const TeacherOnlyRoute: React.FC<RestrictedRouteProps> = ({ redirectTo, children }) => (
  <CheckUserRole checkValue={UserRole.TEACHER} redirectTo={redirectTo}>
    {children}
  </CheckUserRole>
);
