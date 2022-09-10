import React from "react";
import { Layout } from "antd";
import { StatusCodes } from "http-status-codes";

import { Course as CoursesType } from "@ts/types";

import { useCoursesTranslation, useCommonTranslation } from "@localization";

import { Request } from "@common/request";

import { Header } from "@containers/header";
import { CourseModal } from "@containers/course-modal";
import { CoursesList } from "@containers/courses-list";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { getCourses } from "./corses.resourses";
import { AddCourseButton } from "./courses.styles";

import { COURSES } from "@client/mock/courses";

export const Courses: React.FC = () => {
  const { t } = useCoursesTranslation();
  const { t: commonT } = useCommonTranslation();

  const [isOpen, setIsOpen] = React.useState(false);
  const [courses, setCourses] = React.useState<CoursesType[]>([]);

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      Request.mock?.onGet("/courses").reply(StatusCodes.OK, Object.values(COURSES));
    }

    getCourses().then(({ data }) => setCourses(data));
  }, []);

  const handleShowModal = React.useCallback(() => setIsOpen(true), [setIsOpen]);

  const handleCloseModal = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <Layout>
      <Header>
        {t("COURSES")}
        <AddCourseButton type="primary" onClick={handleShowModal}>
          {commonT("ADD")}
        </AddCourseButton>
      </Header>
      <Content>
        <CoursesList courses={courses} />
        <CourseModal course={COURSES.Group01English} isOpen={isOpen} onClose={handleCloseModal} />
      </Content>
      <Footer />
    </Layout>
  );
};
