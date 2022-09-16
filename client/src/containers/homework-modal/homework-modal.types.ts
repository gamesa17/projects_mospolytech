import { HomeworkDto, ModelId } from "@ts/types";

export type HomeworkModalFormValues = {
  course: ModelId;

  name: string;
  link: string;
  description: string;

  deadlineAt: string;
};

export type HomeworkModalProps = {
  isOpen: boolean;
  homework?: HomeworkDto;
  onClose: () => void;
  onSubmit?: (values: HomeworkModalFormValues) => void;
};
