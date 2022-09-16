import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { HomeworkDto, ModelId } from "@ts/types";

export type HomeworkTableProps = {
  homework: HomeworkDto[];
  calendarDate: moment.Moment;
  calendarMode: CalendarMode;
  onEditHomework?: (homeworkId: ModelId) => void;
  onDeleteHomework?: (homeworkId: ModelId) => void;
};

export type TableHomework = HomeworkDto & {
  key: string;
};
