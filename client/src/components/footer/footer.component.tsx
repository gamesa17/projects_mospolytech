import React from "react";
import { useCommonTranslation } from "@localization";
import { FooterWrapper } from "./footer.styles";

export const Footer: React.FC = () => {
  const { t } = useCommonTranslation();

  return <FooterWrapper>{t("LICENSE")}</FooterWrapper>;
};
