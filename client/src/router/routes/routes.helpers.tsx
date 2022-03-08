import React from "react";
import { Loader } from "@components/loader";
import { PrivateRoute, PublicRoute } from "@containers/secured-route";
import { ROUTES } from "./routes.constants";
import { RouteAccessType } from "./routes.types";

export const wrapSecuredRoute = (accessType: RouteAccessType, Route: React.FC) => {
  if (accessType === RouteAccessType.PUBLIC) {
    return (
      <PublicRoute redirectTo={ROUTES.DASHBOARD}>
        <Route />
      </PublicRoute>
    );
  }

  return (
    <PrivateRoute redirectTo={ROUTES.LOGIN}>
      <Route />
    </PrivateRoute>
  );
};

export const wrapDashboardRoute = (Route: React.FC) => (
  <React.Suspense fallback={<Loader />}>{wrapSecuredRoute(RouteAccessType.PRIVATE, Route)}</React.Suspense>
);
