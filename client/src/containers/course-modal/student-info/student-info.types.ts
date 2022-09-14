import { Dispatch, SetStateAction } from "react";
import { Student } from "@containers/course-modal/course-modal.types";

export type StudentInfoProps = {
  student: Student;
  students: Student[];
  onAddStudent: (studentId: number) => void;
  onRemoveStudent: (studentId: number) => void;
  setStudents: Dispatch<SetStateAction<Student[]>>;
};
