import React from "react";
import { RoutesNames } from "./routes.types";

export const ROUTES = {
  [RoutesNames.DASHBOARD]: "/dashboard",
  [RoutesNames.HOMEWORK]: "/dashboard/homework",
  [RoutesNames.GROUPS]: "/dashboard/groups",
  [RoutesNames.PROFILE]: "/dashboard/profile",

  [RoutesNames.REGISTER]: "/register",
  [RoutesNames.LOGIN]: "/login",

  [RoutesNames.NOT_FOUND]: "*",
};

export const LAZY_ROUTES = {
  DashboardWrapper: React.lazy(
    () => import(/* webpackChunkName: "lazy~dashboard-wrapper" */ "../../containers/dashboard-wrapper")
  ),

  Profile: React.lazy(() => import(/* webpackChunkName: "lazy~page-profile" */ "./profile")),
  Homework: React.lazy(() => import(/* webpackChunkName: "lazy~page-homework" */ "./homework")),
  Groups: React.lazy(() => import(/* webpackChunkName: "lazy~page-groups" */ "./groups")),

  Register: React.lazy(() => import(/* webpackChunkName: "lazy~page-register" */ "./register")),
  Login: React.lazy(() => import(/* webpackChunkName: "lazy~page-login" */ "./login")),

  NotFound: React.lazy(() => import(/* webpackChunkName: "lazy~page-not-found" */ "./not-found")),
};
