import React from "react";
import { Layout } from "antd";
import { useCommonTranslation } from "@localization";
import { Header } from "@containers/header";
import { Footer } from "@components/footer";

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
