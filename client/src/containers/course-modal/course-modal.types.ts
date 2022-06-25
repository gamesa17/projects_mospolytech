import { Course } from "@ts/types";
import { Student } from "@ts/types";

export type CourseModalProps = {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
};

export interface StudentExtended extends Student {
  new?: boolean;
}
