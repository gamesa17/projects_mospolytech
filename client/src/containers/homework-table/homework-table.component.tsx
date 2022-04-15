import React from "react";
import { Table } from "antd";

import { getTableLocale } from "@common/table";
import { useCommonTranslation } from "@localization";

import { Homework } from "@ts/homework";

import { HomeworkDetails } from "./homework-details";
import { useHomeworkTableColumns } from "./homework-table.hooks";
import { HomeworkTableWrapper } from "./homework-table.styles";
import { HomeworkTableProps, TableHomework } from "./homework-table.types";

// TODO: Добавить кнопку для создания д/з, если таблица пустая(только для учителя)
const HomeworkTableRoot: React.FC<HomeworkTableProps> = ({ homework, calendarDate, calendarMode }) => {
  const { t } = useCommonTranslation();

  const onEditHomework = React.useCallback((hw: Homework) => {
    console.log("🚀 ~ file: homework-table.component.tsx ~ line 11 ~ onEditHomework ", hw);
  }, []);

  const onDeleteHomework = React.useCallback((hw: Homework) => {
    console.log("🚀 ~ file: homework-table.component.tsx ~ line 15 ~ onDeleteHomework", hw);
  }, []);

  const columns = useHomeworkTableColumns(onEditHomework, onDeleteHomework);

  const tableData = React.useMemo(() => {
    const data = homework.map((hw) => ({ ...hw, key: `${hw.id}-${calendarMode}-${+calendarDate}` }));

    if (calendarMode === "month") {
      return data.filter(({ deadline }) => calendarDate.isSame(deadline, "day"));
    }

    return data.filter(({ deadline }) => calendarDate.isSame(deadline, "month"));
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
