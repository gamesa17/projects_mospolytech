import React from "react";

export type CheckAuthProps = React.PropsWithChildren<{
  checkValue?: boolean;
  redirectTo: string;
}>;

export type SecuredRouteProps = React.PropsWithChildren<{
  redirectTo: string;
}>;
