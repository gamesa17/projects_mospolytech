import { Homework } from "@ts/types";

export type HomeworkActionsProps = Homework & {
  canEdit: boolean;
  canDelete: boolean;
  canUpdateDoneStatus: boolean;
  onEdit: () => void;
  onDelete: () => void;
};
