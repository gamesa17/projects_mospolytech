import React from "react";

export const ROUTES = {
  PAGE_404: "*",
};

export const LAZY_ROUTES = {
  MainPage: React.lazy(() => import(/* webpackChunkName: "lazy~landing-page" */ "./main-page")),
  Page404: React.lazy(() => import(/* webpackChunkName: "lazy~page-404" */ "./page-404")),
};
