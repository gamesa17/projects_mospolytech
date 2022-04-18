import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "@client/store";
import { selectAuthorized } from "@client/store/authorization";

import { CheckAuthProps, SecuredRouteProps } from "./check-auth.types";

const CheckAuth: React.FC<CheckAuthProps> = ({ checkValue = true, redirectTo, children }) => {
  const authorized = useSelector(selectAuthorized);

  if (authorized !== checkValue) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export const PrivateRoute: React.FC<SecuredRouteProps> = ({ redirectTo, children }) => (
  <CheckAuth redirectTo={redirectTo}>{children}</CheckAuth>
);

export const PublicRoute: React.FC<SecuredRouteProps> = ({ redirectTo, children }) => (
  <CheckAuth checkValue={false} redirectTo={redirectTo}>
    {children}
  </CheckAuth>
);
