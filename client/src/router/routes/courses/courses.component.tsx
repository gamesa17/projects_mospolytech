import React from "react";
import { Layout } from "antd";
import { Header } from "@containers/header";
import { Footer } from "@components/footer";
import { Content } from "@components/content";
import { useCoursesTranslation } from "@localization";

export const Courses: React.FC = () => {
  const { t } = useCoursesTranslation();

  return (
    <Layout>
      <Header>{t("COURSES")}</Header>
      <Content></Content>
      <Footer />
    </Layout>
  );
};
