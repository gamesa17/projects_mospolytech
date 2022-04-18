import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "@components/loader";
import { LAZY_ROUTES, ROUTES, wrapDashboardRoute, wrapSecuredRoute } from "./routes";
import { RouteAccessType } from "./routes/routes.types";

const { DashboardWrapper, Register, Login, Profile, Homework, Courses, NotFound } = LAZY_ROUTES;

export const Router: React.FC = () => (
  <React.Suspense fallback={<Loader />}>
    <Routes>
      {/* Temp */}
      <Route index element={<Navigate to={ROUTES.LOGIN} />} />
      {/* !Temp */}

      {/* Authorization */}
      <Route path={ROUTES.REGISTER} element={wrapSecuredRoute(RouteAccessType.PUBLIC, Register)} />
      <Route path={ROUTES.LOGIN} element={wrapSecuredRoute(RouteAccessType.PUBLIC, Login)} />

      {/* Dashboard */}
      <Route path={ROUTES.DASHBOARD} element={wrapDashboardRoute(DashboardWrapper)}>
        {/* Temp */}
        <Route index element={<Navigate to={ROUTES.HOMEWORK} />} />
        {/* !Temp */}

        <Route path={ROUTES.HOMEWORK} element={wrapDashboardRoute(Homework)} />
        <Route path={ROUTES.PROFILE} element={wrapDashboardRoute(Profile)} />
        <Route path={ROUTES.COURSES} element={wrapDashboardRoute(Courses)} />

        {/* Not Found - 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>

      {/* Not Found - 404 */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </React.Suspense>
);
