import React from "react";
import { Route, Routes } from "react-router-dom";
import { useCommonTranslation } from "@common/localization";
import { LAZY_ROUTES, ROUTES } from "./routes";

const { MainPage, Page404 } = LAZY_ROUTES;

export const Router: React.FC = () => {
  const { t } = useCommonTranslation();

  return (
    // TODO: Add loader for pages
    <React.Suspense fallback={t<string>("LOADING...")}>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path={ROUTES.PAGE_404} element={<Page404 />} />
      </Routes>
    </React.Suspense>
  );
};
