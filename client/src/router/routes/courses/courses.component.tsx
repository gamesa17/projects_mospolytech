import React from "react";
import { Layout } from "antd";
import { StatusCodes } from "http-status-codes";

import { CourseDto } from "@ts/types";

import { useCoursesTranslation, useCommonTranslation } from "@localization";

import { Request } from "@common/request";

import { useSelector } from "@client/store";
import { selectCapabilities } from "@client/store/permissions";

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

  const { canCreateCourses } = useSelector(selectCapabilities);

  const [isOpen, setIsOpen] = React.useState(false);
  const [courses, setCourses] = React.useState<CourseDto[]>([]);
  const [modalCourse, setModalCourse] = React.useState<CourseDto>();
  const [coursesLoading, setCoursesLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      Request.mock?.onGet("/courses").reply(StatusCodes.OK, Object.values(COURSES));
    }

    setCoursesLoading(true);

    getCourses()
      .then(({ data }) => {
        setCourses(data);

        if (!data.length) {
          setCoursesLoading(false);
        }
      })
      .catch(() => setCoursesLoading(false));
  }, []);

  const handleShowModal = React.useCallback(
    (courseId?: number) => {
      setIsOpen(true);

      const course = courses.find(({ id }) => id === courseId);

      if (course) {
        setModalCourse(course);
      }
    },
    [courses, setIsOpen]
  );

  const handleCloseModal = React.useCallback(() => {
    setIsOpen(false);
    setModalCourse(undefined);
  }, [setIsOpen]);

  const handleCoursesPhotosLoaded = React.useCallback(() => setCoursesLoading(false), []);

  return (
    <Layout>
      <Header>
        {t("COURSES")}
        {canCreateCourses && (
          <AddCourseButton type="primary" onClick={handleShowModal.bind(null, undefined)}>
            {commonT("ADD")}
          </AddCourseButton>
        )}
      </Header>
      <Content>
        <CoursesList
          courses={courses}
          loading={coursesLoading}
          onEditCourse={handleShowModal}
          onCoursesPhotosLoaded={handleCoursesPhotosLoaded}
        />
        {canCreateCourses && <CourseModal isOpen={isOpen} course={modalCourse} onClose={handleCloseModal} />}
      </Content>
      <Footer />
    </Layout>
  );
};
