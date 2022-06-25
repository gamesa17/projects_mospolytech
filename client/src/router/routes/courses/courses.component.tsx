import React from "react";
import { Layout } from "antd";

import { useCoursesTranslation, useCommonTranslation } from "@localization";

import { Header } from "@containers/header";
import { CourseModal } from "@containers/course-modal";
import { CoursesList } from "@containers/courses-list";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { AddCourseButton } from "./courses.styles";

import { COURSES } from "@client/mock/courses";

export const Courses: React.FC = () => {
  const { t } = useCoursesTranslation();
  const { t: commonT } = useCommonTranslation();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleShowModal = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  return (
    <Layout>
      <Header>
        {t("COURSES")}
        <AddCourseButton type="primary" onClick={handleShowModal}>
          {commonT("ADD")}
        </AddCourseButton>
      </Header>
      <Content>
        <CoursesList courses={Object.values(COURSES)} />
        <CourseModal course={COURSES.Group01English} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </Content>
      <Footer />
    </Layout>
  );
};
