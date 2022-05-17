import React from "react";

import { CourseCard } from "@components/course-card";

import { CoursesListWrapper } from "./courses-list.styles";
import { CoursesListProps } from "./courses-list.types";

const CoursesListRoot: React.FC<CoursesListProps> = ({ courses }) => (
  <CoursesListWrapper>
    {courses.map((course) => (
      <CourseCard key={course.id} {...course}></CourseCard>
    ))}
  </CoursesListWrapper>
);

export const CoursesList = React.memo(CoursesListRoot);
