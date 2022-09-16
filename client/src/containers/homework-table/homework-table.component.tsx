import React from "react";
import { Table } from "antd";

import { getTableLocale } from "@common/table";
import { useCommonTranslation } from "@localization";

import { Homework } from "@ts/types";

import { HomeworkDetails } from "./homework-details";
import { useHomeworkTableColumns } from "./homework-table.hooks";
import { HomeworkTableWrapper } from "./homework-table.styles";
import { HomeworkTableProps, TableHomework } from "./homework-table.types";

// TODO: Добавить кнопку для создания д/з, если таблица пустая(только для учителя)
const HomeworkTableRoot: React.FC<HomeworkTableProps> = ({
  homework,
  calendarDate,
  calendarMode,
  onEditHomework,
  onDeleteHomework,
}) => {
  const { t } = useCommonTranslation();

  const handleEditHomework = React.useCallback(
    (hw: Homework) => onEditHomework && onEditHomework(hw.id),
    [onEditHomework]
  );

  const handleDeleteHomework = React.useCallback(
    (hw: Homework) => onDeleteHomework && onDeleteHomework(hw.id),
    [onDeleteHomework]
  );

  const columns = useHomeworkTableColumns(handleEditHomework, handleDeleteHomework);

  const tableData = React.useMemo(() => {
    const data = homework
      .sort((hw1, hw2) => +new Date(hw1.deadlineAt) - +new Date(hw2.deadlineAt))
      .map((hw) => ({ ...hw, key: `${hw.id}-${calendarMode}-${+calendarDate}` }));

    if (calendarMode === "month") {
      return data.filter(({ deadlineAt }) => calendarDate.isSame(deadlineAt, "day"));
    }

    return data.filter(({ deadlineAt }) => calendarDate.isSame(deadlineAt, "month"));
  }, [homework, calendarMode, calendarDate]);

  return (
    <HomeworkTableWrapper>
      <Table<TableHomework>
        locale={getTableLocale(t)}
        columns={columns}
        dataSource={tableData}
        expandable={{
          expandedRowRender: (hw) => <HomeworkDetails {...hw} />,
        }}
      />
    </HomeworkTableWrapper>
  );
};

export const HomeworkTable = React.memo(HomeworkTableRoot);
