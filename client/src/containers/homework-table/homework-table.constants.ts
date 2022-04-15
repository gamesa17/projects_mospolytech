import i18next from "i18next";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Course } from "@ts/course";
import { TableHomework } from "./homework-table.types";

export const HOMEWORK_TABLE_COLUMNS: ColumnsType<TableHomework> = [
  Table.EXPAND_COLUMN,
  {
    title: "HOMEWORK_TABLE.COLUMNS_NAME.ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "HOMEWORK_TABLE.COLUMNS_NAME.NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "HOMEWORK_TABLE.COLUMNS_NAME.COURSE",
    dataIndex: "course",
    key: "course",
    render: (course: Course) => course.name,
  },
  {
    title: "HOMEWORK_TABLE.COLUMNS_NAME.DEADLINE",
    key: "deadline",
    dataIndex: "deadline",
    render: (deadline: number) => new Date(deadline).toLocaleDateString(i18next.language),
  },
];
