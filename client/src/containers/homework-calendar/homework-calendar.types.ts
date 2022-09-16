import React from "react";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { HomeworkDto } from "@ts/types";

export type HomeworkCalendarProps = {
  homeworks: HomeworkDto[];
  date: moment.Moment;
  calendarMode: CalendarMode;
  onDateChange: React.Dispatch<React.SetStateAction<moment.Moment>>;
  onCalendarModeChange: React.Dispatch<React.SetStateAction<CalendarMode>>;
};
