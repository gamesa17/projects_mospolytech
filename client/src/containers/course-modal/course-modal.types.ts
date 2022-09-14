import { User, CourseDto } from "@ts/types";

export type CourseModalProps = {
  course?: CourseDto;
  isOpen: boolean;
  onClose: () => void;
};

export interface Student extends User {
  new?: boolean;
}

export type CourseModalFormType = {
  name: string;
  level: string;
  language: string;
};
