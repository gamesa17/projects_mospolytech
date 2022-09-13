import React from "react";
import { Card, Skeleton } from "antd";

import { CourseCard } from "@components/course-card";

import { useSelector } from "@client/store";
import { selectCapabilities } from "@client/store/permissions";

import { CoursesListSkeletonWrapper, CoursesListWrapper } from "./courses-list.styles";
import { CoursesListProps } from "./courses-list.types";

const CoursesListRoot: React.FC<CoursesListProps> = ({
  loading,
  courses,
  onEditCourse,
  onDeleteCourse,
  onCoursesPhotosLoaded,
}) => {
  const { canUpdateSpecificCourses, canUpdateSpecificCoursesMembers, canDeleteSpecificCourses } =
    useSelector(selectCapabilities);

  const [, setPhotosLoaded] = React.useState<boolean[]>();

  React.useEffect(() => setPhotosLoaded(courses.map(() => false)), [courses]);

  const handleCoursePhotoLoad = React.useCallback(
    (courseIndex: number) => {
      setPhotosLoaded((prevPhotosLoaded) => {
        const newPhotosLoaded = prevPhotosLoaded?.map((loaded, index) => (index === courseIndex ? true : loaded));

        if (newPhotosLoaded?.every(Boolean) && onCoursesPhotosLoaded) {
          onCoursesPhotosLoaded();
        }

        return newPhotosLoaded;
      });
    },
    [onCoursesPhotosLoaded]
  );

  return (
    <CoursesListWrapper>
      {loading && (
        <CoursesListSkeletonWrapper>
          <Card cover={<Skeleton.Image style={{ width: 300, height: 200 }} />} loading style={{ width: 300 }} />
          <Card cover={<Skeleton.Image style={{ width: 300, height: 200 }} />} loading style={{ width: 300 }} />
          <Card cover={<Skeleton.Image style={{ width: 300, height: 200 }} />} loading style={{ width: 300 }} />
        </CoursesListSkeletonWrapper>
      )}
      {courses.map((course, courseIndex) => (
        <CourseCard
          key={course.id}
          {...course}
          canEdit={canUpdateSpecificCourses}
          canDelete={canDeleteSpecificCourses}
          canAddMembers={canUpdateSpecificCoursesMembers}
          onEdit={onEditCourse?.bind(null, course.id)}
          onDelete={onDeleteCourse?.bind(null, course.id)}
          onPhotoLoad={handleCoursePhotoLoad.bind(null, courseIndex)}
        ></CourseCard>
      ))}
    </CoursesListWrapper>
  );
};

export const CoursesList = React.memo(CoursesListRoot);
