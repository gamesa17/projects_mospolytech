import React from "react";
import { useMainPageTranslation } from "@localization";

export const MainPage: React.FC = () => {
  const { t } = useMainPageTranslation();

  return <div>{t("MAIN_PAGE")}</div>;
};
