import React from "react";
import moment from "moment";
import { Layout } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";

import { Request } from "@common/request";
import { HOMEWORKS } from "@client/mock/homeworks";
import { useCommonTranslation, useHomeworkTranslation } from "@localization";

import { Header } from "@containers/header";
import { HomeworkTable } from "@containers/homework-table";
import { HomeworkCalendar } from "@containers/homework-calendar";

import { Footer } from "@components/footer";
import { Content } from "@components/content";

import { AddHomeworkButton } from "./homework.styles";
import { getHomeworks } from "./homework.resourses";
import { StatusCodes } from "http-status-codes";
import { Homework as HomeworkType } from "@ts/types";

export const Homework: React.FC = () => {
  const { t } = useHomeworkTranslation();
  const { t: commonT } = useCommonTranslation();

  const [calendarMode, setCalendarMode] = React.useState<CalendarMode>("month");
  const [calendarDate, setCalendarDate] = React.useState<moment.Moment>(moment());

  const [homeworks, setHomeworks] = React.useState<HomeworkType[]>([]);

  React.useEffect(() => {
    if (process.env.USE_MOCKS) {
      Request.mock?.onGet("/homeworks").reply(StatusCodes.OK, Object.values(HOMEWORKS));
    }

    getHomeworks().then(({ data }) => {
      setHomeworks(data);
    });
  }, [t]);

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
          homeworks={homeworks}
          calendarMode={calendarMode}
          onDateChange={setCalendarDate}
          onCalendarModeChange={setCalendarMode}
        />
        <HomeworkTable calendarDate={calendarDate} calendarMode={calendarMode} homework={homeworks} />
        <Footer />
      </Content>
    </Layout>
  );
};
