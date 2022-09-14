import { Dispatch, SetStateAction } from "react";
import { Student } from "@containers/course-modal/course-modal.types";

export type StudentInfoProps = {
  student: Student;
  removeStudent: (studentId: number) => void;
  setStudents: Dispatch<SetStateAction<Student[]>>;
};
