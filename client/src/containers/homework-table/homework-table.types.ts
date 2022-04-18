import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { Homework } from "@ts/types";

export type HomeworkTableProps = {
  homework: Homework[];
  calendarDate: moment.Moment;
  calendarMode: CalendarMode;
};

export type TableHomework = Homework & {
  key: string;
};
