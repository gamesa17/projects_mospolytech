import React from "react";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

export type HomeworkCalendarProps = {
  date: moment.Moment;
  calendarMode: CalendarMode;
  onDateChange: React.Dispatch<React.SetStateAction<moment.Moment>>;
  onCalendarModeChange: React.Dispatch<React.SetStateAction<CalendarMode>>;
};
