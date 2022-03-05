import React from "react";
import { useCommonTranslation } from "@localization";

export const Page404: React.FC = () => {
  const { t } = useCommonTranslation();

  return <div>{t("404")}</div>;
};
