import { Homework } from "@ts/homework";

export type HomeworkActionsProps = Homework & {
  onEdit: () => void;
  onDelete: () => void;
};
