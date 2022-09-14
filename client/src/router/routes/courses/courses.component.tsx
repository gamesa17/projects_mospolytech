import React from "react";
import { Layout } from "antd";
import { StatusCodes } from "http-status-codes";

import { Course, CourseDto } from "@ts/types";

import { useCoursesTranslation, useCommonTranslation } from "@localization";

import { Request } from "@common/request";

import { useSelector } from "@client/store";
import { COURSES } from "@client/mock/courses";
import { selectUser } from "@client/store/user";
import { selectCapabilities } from "@client/store/permissions";

import { Header } from "@containers/header";
import { CoursesList } from "@containers/courses-list";
import { CourseModal, CourseModalFormValues } from "@containers/course-modal";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { createCourse, deleteCourse, getCourses, updateCourse } from "./corses.resourses";
import { AddCourseButton } from "./courses.styles";

export const Courses: React.FC = () => {
  const { t } = useCoursesTranslation();
  const { t: commonT } = useCommonTranslation();

  const { id } = useSelector(selectUser) || {};
  const { canCreateCourses } = useSelector(selectCapabilities);

  const [isOpen, setIsOpen] = React.useState(false);
  const [courses, setCourses] = React.useState<CourseDto[]>([]);
  const [modalCourse, setModalCourse] = React.useState<CourseDto>();
  const [coursesLoading, setCoursesLoading] = React.useState<boolean>(false);

  const isModalEditMode = !!modalCourse;

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

      const course = courses.find((course) => course.id === courseId);

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

  const handleCreateCourse = React.useCallback(
    (course: Omit<Course, "id">) =>
      createCourse(course).then(({ data: createdCourse }) => {
        setCourses((prevCourses) => [...prevCourses, createdCourse]);
      }),
    []
  );

  const handleEditCourse = React.useCallback(
    (courseId: number, updatedCourse: Course) =>
      updateCourse(courseId, updatedCourse).then(({ data: updatedCourse }) => {
        setIsOpen((prevIsOpen) => {
          if (prevIsOpen) {
            setModalCourse(updatedCourse);
          }

          return prevIsOpen;
        });

        setCourses((prevCourses) =>
          prevCourses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course))
        );
      }),
    []
  );

  const handleDeleteCourse = React.useCallback(
    (courseId: number) =>
      deleteCourse(courseId).then(() =>
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId))
      ),
    []
  );

  const handleSubmitCourseForm = React.useCallback(
    (values: CourseModalFormValues) => {
      console.log("🚀 ~ file: courses.component.tsx ~ line 114 ~ values", values);

      if (isModalEditMode) {
        handleEditCourse(modalCourse.id, { ...modalCourse, ...values });
      } else if (id) {
        handleCreateCourse({ ...values, teacher: id });
      }
    },
    [id, modalCourse, isModalEditMode, handleEditCourse, handleCreateCourse]
  );

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
          onDeleteCourse={handleDeleteCourse}
          onCoursesPhotosLoaded={handleCoursesPhotosLoaded}
        />
        {canCreateCourses && (
          <CourseModal
            isOpen={isOpen}
            course={modalCourse}
            onClose={handleCloseModal}
            onSubmit={handleSubmitCourseForm}
          />
        )}
      </Content>
      <Footer />
    </Layout>
  );
};
