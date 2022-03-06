import React from "react";
import { Route, Routes } from "react-router-dom";
import { useCommonTranslation } from "@localization";
import { LAZY_ROUTES, ROUTES } from "./routes";

const { DashboardWrapper, Register, Login, Profile, NotFound } = LAZY_ROUTES;

export const Router: React.FC = () => {
  const { t } = useCommonTranslation();

  return (
    // TODO: Add loader for pages
    <React.Suspense fallback={t<string>("LOADING...")}>
      <Routes>
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        <Route path={ROUTES.DASHBOARD} element={<DashboardWrapper />}>
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};
