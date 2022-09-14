import { User, CourseDto } from "@ts/types";

export type CourseModalProps = {
  course?: CourseDto;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: CourseModalFormValues) => void;
};

export interface Student extends User {
  new?: boolean;
}

export type CourseModalFormValues = {
  name: string;
  level: number;
  language: number;
  students: number[];
};
