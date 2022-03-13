import React from "react";
import i18next from "i18next";
import { HOMEWORKS } from "@client/mock/homeworks";
import { CalendarCell } from "./calendar-cell";
import { Calendar } from "./homework-calendar.styles";
import { CALENDAR_LOCALES } from "./homework-calendar.constants";

const HomeworkCalendarRoot: React.FC = () => {
  const locale = CALENDAR_LOCALES[i18next.language];

  const getDateHomework = React.useCallback(
    (date: moment.Moment) => Object.values(HOMEWORKS).filter(({ deadline }) => date.isSame(deadline, "day")),
    []
  );

  const getMonthHomework = React.useCallback(
    (date: moment.Moment) => Object.values(HOMEWORKS).filter(({ deadline }) => date.isSame(deadline, "month")),
    []
  );

  if (!locale) {
    console.error(`[HomeworkCalendar]: Unsupported calendar language: ${i18next.language}`);

    return null;
  }

  return (
    <Calendar
      locale={locale}
      dateCellRender={(date) => <CalendarCell homework={getDateHomework(date)} />}
      monthCellRender={(date) => <CalendarCell homework={getMonthHomework(date)} />}
    />
  );
};

export const HomeworkCalendar = React.memo(HomeworkCalendarRoot);
