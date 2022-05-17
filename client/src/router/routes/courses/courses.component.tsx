import React from "react";
import { Layout } from "antd";

import { useCommonTranslation, useCoursesTranslation } from "@localization";

import { CoursesList } from "@containers/courses-list";

import { Header } from "@containers/header";
import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { AddCourseButton } from "./courses.styles";

import { COURSES } from "@client/mock/courses";

export const Courses: React.FC = () => {
  const { t } = useCoursesTranslation();
  const { t: commonT } = useCommonTranslation();

  return (
    <Layout>
      <Header>
        {t("COURSES")}
        <AddCourseButton type="primary">{commonT("ADD")}</AddCourseButton>
      </Header>
      <Content>
        <CoursesList courses={Object.values(COURSES)}></CoursesList>
      </Content>
      <Footer />
    </Layout>
  );
};
