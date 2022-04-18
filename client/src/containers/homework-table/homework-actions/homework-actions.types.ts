import { Homework } from "@ts/types";

export type HomeworkActionsProps = Homework & {
  onEdit: () => void;
  onDelete: () => void;
};
