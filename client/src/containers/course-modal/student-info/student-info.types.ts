import { Dispatch, SetStateAction } from "react";
import { StudentExtended } from "@containers/course-modal/course-modal.types";

export type StudentInfoProps = {
  student: StudentExtended;
  removeStudent: (studentId: number) => void;
  setStudents: Dispatch<SetStateAction<StudentExtended[]>>;
};
