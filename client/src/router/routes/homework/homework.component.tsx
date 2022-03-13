import React from "react";
import { Layout } from "antd";
import { Header } from "@containers/header";
import { Footer } from "@components/footer";
import { Content } from "@components/content";
import { HomeworkCalendar } from "@containers/homework-calendar";
import { useHomeWorkTranslation } from "@localization/localization.hooks";

export const Homework: React.FC = () => {
  const { t } = useHomeWorkTranslation();

  return (
    <Layout>
      <Header>{t("HOMEWORK")}</Header>
      <Content>
        <HomeworkCalendar />
      </Content>
      <Footer />
    </Layout>
  );
};
