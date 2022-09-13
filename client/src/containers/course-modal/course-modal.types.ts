import { CourseDto } from "@ts/types";
import { Student } from "@ts/types";

export type CourseModalProps = {
  course?: CourseDto;
  isOpen: boolean;
  onClose: () => void;
};

export interface StudentExtended extends Student {
  new?: boolean;
}

export type CourseModalFormType = {
  name: string;
  level: string;
  language: string;
};
