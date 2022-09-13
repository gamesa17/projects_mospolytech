import { CourseDto } from "@ts/types";

export type CoursesListProps = {
  loading: boolean;
  courses: CourseDto[];
  onEditCourse?: (id: number) => void;
  onDeleteCourse?: (id: number) => void;
  onCoursesPhotosLoaded?: () => void;
};
