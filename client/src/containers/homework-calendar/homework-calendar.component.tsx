import React from "react";
import i18next from "i18next";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

import { HOMEWORKS } from "@client/mock/homeworks";
import { CalendarCell } from "./calendar-cell";

import { CALENDAR_LOCALES } from "./homework-calendar.constants";
import { Calendar } from "./homework-calendar.styles";
import { HomeworkCalendarProps } from "./homework-calendar.types";

const HomeworkCalendarRoot: React.FC<HomeworkCalendarProps> = ({
  date,
  calendarMode,
  onDateChange,
  onCalendarModeChange,
}) => {
  const locale = CALENDAR_LOCALES[i18next.language];

  const getCalendarData = React.useCallback(([start, end]: [moment.Moment, moment.Moment]) => {
    console.log("🚀 ~ file: homework-calendar.component.tsx ~ line 19 ~ getCalendarData for period: ", [
      start.toLocaleString(),
      end.toLocaleString(),
    ]);
  }, []);

  const getDateHomework = React.useCallback(
    (date: moment.Moment) => Object.values(HOMEWORKS).filter(({ deadline }) => date.isSame(deadline, "day")),
    []
  );

  const getMonthHomework = React.useCallback(
    (date: moment.Moment) => Object.values(HOMEWORKS).filter(({ deadline }) => date.isSame(deadline, "month")),
    []
  );

  const handlePanelChange = React.useCallback(
    (newDate: moment.Moment, newCalendarMode: CalendarMode) => {
      onDateChange(newDate);
      onCalendarModeChange(newCalendarMode);

      if (newDate !== date || calendarMode !== newCalendarMode) {
        getCalendarData([newDate.clone().startOf(calendarMode), newDate.clone().endOf(calendarMode)]);
      }
    },
    [date, calendarMode, onDateChange, onCalendarModeChange, getCalendarData]
  );

  if (!locale) {
    console.error(`[HomeworkCalendar]: Unsupported calendar language: ${i18next.language}`);

    return null;
  }

  return (
    <Calendar
      locale={locale}
      value={date}
      mode={calendarMode}
      dateCellRender={(date) => <CalendarCell homework={getDateHomework(date)} />}
      monthCellRender={(date) => <CalendarCell homework={getMonthHomework(date)} />}
      onSelect={onDateChange}
      onPanelChange={handlePanelChange}
    />
  );
};

export const HomeworkCalendar = React.memo(HomeworkCalendarRoot);
