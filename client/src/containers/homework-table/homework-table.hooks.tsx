import React from "react";
import { ColumnsType } from "antd/lib/table";

import { useHomeworkTranslation } from "@localization";

import { Homework } from "@ts/types";

import { HomeworkActions } from "./homework-actions";
import { HOMEWORK_TABLE_COLUMNS } from "./homework-table.constants";
import { TableHomework } from "./homework-table.types";
import { useSelector } from "@client/store";
import { selectCapabilities } from "@client/store/permissions";

export const useHomeworkTableColumns = (
  onEdit: (homework: Homework) => void,
  onDelete: (homework: Homework) => void
): ColumnsType<TableHomework> => {
  const { t } = useHomeworkTranslation();

  const {
    canUpdateHomeworkSpecificCourses,
    canDeleteHomeworkSpecificCourses,
    canUpdateHomeworkDoneStatusSpecificUsers,
  } = useSelector(selectCapabilities);

  const actionColumn = React.useMemo(
    () => ({
      title: "Действия",
      key: "action",
      render: (_text: string, homework: Homework) => (
        <HomeworkActions
          {...homework}
          canEdit={canUpdateHomeworkSpecificCourses}
          canDelete={canDeleteHomeworkSpecificCourses}
          canUpdateDoneStatus={canUpdateHomeworkDoneStatusSpecificUsers}
          onEdit={onEdit.bind(null, homework)}
          onDelete={onDelete.bind(null, homework)}
        />
      ),
    }),
    [
      canUpdateHomeworkSpecificCourses,
      canDeleteHomeworkSpecificCourses,
      canUpdateHomeworkDoneStatusSpecificUsers,
      onEdit,
      onDelete,
    ]
  );

  return React.useMemo(
    () =>
      HOMEWORK_TABLE_COLUMNS.map((column) => {
        if (!column.title) {
          return column;
        }

        return { ...column, title: t(column.title as string) };
      }).concat([actionColumn]),
    [actionColumn, t]
  );
};
