import React from "react";
import { Layout } from "antd";
import { Header } from "@components/header";
import { Footer } from "@components/footer";
import { useCommonTranslation } from "@localization";

export const Profile: React.FC = () => {
  const { t } = useCommonTranslation();

  return (
    <Layout>
      <Header>{t("Ваш профиль")}</Header>
      <Layout.Content>{t("Профиль")}</Layout.Content>
      <Footer />
    </Layout>
  );
};
