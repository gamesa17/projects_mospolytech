import React from "react";
import { Layout } from "antd";
import { Header } from "@containers/header";
import { Footer } from "@components/footer";
import { Content } from "@components/content";
import { useGroupsTranslation } from "@localization";

export const Groups: React.FC = () => {
  const { t } = useGroupsTranslation();

  return (
    <Layout>
      <Header>{t("GROUPS")}</Header>
      <Content></Content>
      <Footer />
    </Layout>
  );
};
