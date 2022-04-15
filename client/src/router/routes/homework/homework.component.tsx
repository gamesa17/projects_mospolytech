import React from "react";
import moment from "moment";
import { Layout } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

import { HOMEWORKS } from "@client/mock/homeworks";
import { GenericObject } from "@common/genericObject";
import { useCommonTranslation, useHomeworkTranslation } from "@localization";

import { Header } from "@containers/header";
import { HomeworkTable } from "@containers/homework-table";
import { HomeworkCalendar } from "@containers/homework-calendar";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { AddHomeworkButton } from "./homework.styles";

export const Homework: React.FC = () => {
  const { t: commonT } = useCommonTranslation();
  const { t } = useHomeworkTranslation();

  const [calendarMode, setCalendarMode] = React.useState<CalendarMode>("month");
  const [calendarDate, setCalendarDate] = React.useState<moment.Moment>(moment());

  return (
    <Layout>
      <Header>
        {t("HOMEWORK")}
        {/* TODO: Добавить проверку на учителя */}
        <AddHomeworkButton type="primary">{commonT("ADD")}</AddHomeworkButton>
      </Header>
      <Content>
        <HomeworkCalendar
          date={calendarDate}
          calendarMode={calendarMode}
          onDateChange={setCalendarDate}
          onCalendarModeChange={setCalendarMode}
        />
        <HomeworkTable
          calendarDate={calendarDate}
          calendarMode={calendarMode}
          homework={GenericObject.values(HOMEWORKS)}
        />
        <Footer />
      </Content>
    </Layout>
  );
};
