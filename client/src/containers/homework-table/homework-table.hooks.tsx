import React from "react";
import { ColumnsType } from "antd/lib/table";
import { useHomeworkTranslation } from "@localization";
import { Homework } from "@ts/homework";

import { HomeworkActions } from "./homework-actions";
import { HOMEWORK_TABLE_COLUMNS } from "./homework-table.constants";
import { TableHomework } from "./homework-table.types";

export const useHomeworkTableColumns = (
  onEdit: (homework: Homework) => void,
  onDelete: (homework: Homework) => void
): ColumnsType<TableHomework> => {
  const { t } = useHomeworkTranslation();

  const actionColumn = React.useMemo(
    () => ({
      title: "Действия",
      key: "action",
      render: (_text: string, homework: Homework) => (
        <HomeworkActions {...homework} onEdit={onEdit.bind(null, homework)} onDelete={onDelete.bind(null, homework)} />
      ),
    }),
    [onEdit, onDelete]
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
